package com.tvtest

import java.security.KeyStore
import java.security.Provider
import java.security.Security
import java.security.cert.CertificateException
import java.security.cert.X509Certificate
import javax.net.ssl.ManagerFactoryParameters
import javax.net.ssl.TrustManager
import javax.net.ssl.TrustManagerFactory
import javax.net.ssl.TrustManagerFactorySpi
import javax.net.ssl.X509TrustManager

class OcspLenientTrustProvider : Provider("OcspLenient", 1.0, "Bypasses OCSP revocation failures") {
    init {
        put(
            "TrustManagerFactory.${TrustManagerFactory.getDefaultAlgorithm()}",
            OcspLenientTmfSpi::class.java.name
        )
    }
}

class OcspLenientTmfSpi : TrustManagerFactorySpi() {

    private var delegateTms: Array<TrustManager> = emptyArray()

    override fun engineInit(ks: KeyStore?) {
        val delegate = findDelegateFactory()
        delegate.init(ks)
        delegateTms = delegate.trustManagers
    }

    override fun engineInit(spec: ManagerFactoryParameters?) {
        val delegate = findDelegateFactory()
        delegate.init(spec)
        delegateTms = delegate.trustManagers
    }

    override fun engineGetTrustManagers(): Array<TrustManager> =
        delegateTms.map { tm ->
            if (tm is X509TrustManager) OcspLenientTrustManager(tm) else tm
        }.toTypedArray()

    private fun findDelegateFactory(): TrustManagerFactory {
        val algo = TrustManagerFactory.getDefaultAlgorithm()
        for (provider in Security.getProviders()) {
            if (provider is OcspLenientTrustProvider) continue
            try {
                return TrustManagerFactory.getInstance(algo, provider)
            } catch (_: Exception) {}
        }
        throw IllegalStateException("No delegate TrustManagerFactory found")
    }
}

private class OcspLenientTrustManager(
    private val delegate: X509TrustManager
) : X509TrustManager {

    override fun checkClientTrusted(chain: Array<X509Certificate>, authType: String) {
        delegate.checkClientTrusted(chain, authType)
    }

    override fun checkServerTrusted(chain: Array<X509Certificate>, authType: String) {
        try {
            delegate.checkServerTrusted(chain, authType)
        } catch (e: CertificateException) {
            if (!isCausedByRevocation(e)) throw e
            android.util.Log.w("OcspLenient", "Bypassed revocation failure: ${e.message}")
        }
    }

    override fun getAcceptedIssuers(): Array<X509Certificate> = delegate.acceptedIssuers

    private fun isCausedByRevocation(e: Throwable): Boolean {
        var cause: Throwable? = e
        while (cause != null) {
            val msg = cause.message.orEmpty()
            if ("validity interval" in msg || "revocation" in msg.lowercase()) return true
            cause = cause.cause
        }
        return false
    }
}
