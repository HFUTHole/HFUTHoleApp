import { ToTopFAB } from '@/components/ToTopFAB'
import React, { useState, useEffect } from 'react'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'

export function AnimatedToTopFAB({ goToTop, visible }) {
  return visible ? (
    <Animated.View
      entering={SlideInRight.springify().damping(17)}
      exiting={SlideOutRight.springify().damping(17)}
    >
      <ToTopFAB onPress={goToTop} />
    </Animated.View>
  ) : null
}
