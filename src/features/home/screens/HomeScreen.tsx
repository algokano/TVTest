import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useHomeSections } from '../hooks/useHomeSections';
import { SectionRow } from '../components/SectionRow';
import { ContinueWatchingRow } from '../components/ContinueWatchingRow';
import { ComingSoonRow } from '../components/ComingSoonRow';
import { useAppSelector } from '@store/index';
import {
  SCREENS,
  type RootStackParamList,
} from '@app/navigation/RootNavigator';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { selectContinueWatchingItems } from '@features/continueWatching/logic';
import { colors } from '@shared/theme';
import type { NormalizedItem } from '@store/slices/catalogSlice';
import { useTVFocusContext } from '@tv/focus/TVFocusProvider';
import styles from './HomeScreen.styles';

interface HeroContent {
  id: string;
  title: string;
  description?: string;
  episodeCount?: number;
  posterUrl?: string;
  thumbnailUrl: string;
  sectionTitle?: string;
}

export const HomeScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { sections, isLoading, isError } = useHomeSections();
  const catalog = useAppSelector(state => state.catalog);
  const continueWatchingItems = useAppSelector(selectContinueWatchingItems);
  const { activeRowIndex } = useTVFocusContext();

  const scrollViewRef = useRef<ScrollView>(null);
  const rowOffsetsRef = useRef<Record<number, number>>({});

  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const heroCollapsed = activeRowIndex > 0;

  const regularSections = useMemo(
    () => sections.filter(s => s.type === 'regular' || s.type === 'banner'),
    [sections],
  );

  const comingSoonItems = useMemo(
    () => Object.values(catalog.items).filter(item => item.isComingSoon),
    [catalog.items],
  );

  const regularSectionsWithData = useMemo(
    () =>
      regularSections.map(section => ({
        section,
        items: section.itemIds.map(id => catalog.items[id]).filter(Boolean),
      })),
    [regularSections, catalog.items],
  );

  const updateHero = useCallback(
    (item: NormalizedItem, sectionTitle?: string) => {
      setHeroContent(prev => {
        if (prev && prev.id === item.id && prev.sectionTitle === sectionTitle) {
          return prev;
        }
        return {
          id: item.id,
          title: item.title,
          description: item.description,
          episodeCount: item.episodeCount,
          posterUrl: item.posterUrl,
          thumbnailUrl: item.thumbnailUrl,
          sectionTitle,
        };
      });
    },
    [],
  );

  const handleItemFocusChange = useCallback(
    (item: NormalizedItem, sectionTitle: string) => {
      updateHero(item, sectionTitle);
    },
    [updateHero],
  );

  useEffect(() => {
    if (heroContent) {
      return;
    }

    const firstSection = regularSectionsWithData[0];
    if (firstSection?.items.length) {
      updateHero(firstSection.items[0], firstSection.section.title);
    }
  }, [heroContent, regularSectionsWithData, updateHero]);

  const handleItemPress = useCallback(
    (item: NormalizedItem) => {
      navigation.navigate(SCREENS.Player, { initialVideoId: item.videoId });
    },
    [navigation],
  );

  const comingSoonRowIndex = regularSectionsWithData.length + 1;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeRowIndex === 0) {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      } else {
        const y = rowOffsetsRef.current[activeRowIndex];
        if (y !== undefined) {
          scrollViewRef.current?.scrollTo({
            y: Math.max(0, y - 20),
            animated: true,
          });
        }
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [activeRowIndex]);

  if (isLoading && !sections.length) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Failed to load home screen.</Text>
      </View>
    );
  }

  const heroImageUri = heroContent?.posterUrl || heroContent?.thumbnailUrl;
  const heroTitleLine = heroContent
    ? heroContent.episodeCount
      ? `${heroContent.title} (${heroContent.episodeCount} episodes)`
      : heroContent.title
    : '';

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        scrollEnabled={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.breadcrumbText}>Main page</Text>

        <View
          style={[
            styles.heroWrapper,
            heroCollapsed && styles.heroWrapperCollapsed,
          ]}
        >
          {heroContent && (
            <View style={styles.heroContainer}>
              <View style={styles.heroTextColumn}>
                <View style={styles.brandRow}>
                  <Text style={styles.brandHeart}>❤️</Text>
                  <Text style={styles.brandName}>My Drama</Text>
                </View>
                <Text style={styles.heroTitle} numberOfLines={2}>
                  {heroTitleLine}
                </Text>
                {heroContent.description ? (
                  <Text style={styles.heroDescription} numberOfLines={5}>
                    {heroContent.description}
                  </Text>
                ) : null}
              </View>
              {heroImageUri ? (
                <View style={styles.heroPosterContainer}>
                  <Image
                    source={{ uri: heroImageUri }}
                    style={styles.heroPoster}
                    resizeMode="cover"
                  />
                </View>
              ) : null}
            </View>
          )}
        </View>

        {regularSectionsWithData.map(({ section, items }, index) => (
          <View
            key={section.id}
            onLayout={e => {
              rowOffsetsRef.current[index] = e.nativeEvent.layout.y;
            }}
          >
            <SectionRow
              section={section}
              items={items}
              onItemPress={handleItemPress}
              onItemFocusChange={handleItemFocusChange}
              rowIndex={index}
            />
          </View>
        ))}

        {continueWatchingItems.length > 0 && (
          <View
            onLayout={e => {
              rowOffsetsRef.current[regularSectionsWithData.length] =
                e.nativeEvent.layout.y;
            }}
          >
            <ContinueWatchingRow
              items={continueWatchingItems}
              onItemPress={handleItemPress}
              onItemFocusChange={handleItemFocusChange}
              rowIndex={regularSectionsWithData.length}
            />
          </View>
        )}

        {comingSoonItems.length > 0 && (
          <View
            onLayout={e => {
              rowOffsetsRef.current[comingSoonRowIndex] =
                e.nativeEvent.layout.y;
            }}
          >
            <ComingSoonRow
              items={comingSoonItems}
              onItemPress={handleItemPress}
              onItemFocusChange={handleItemFocusChange}
              rowIndex={comingSoonRowIndex}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};
