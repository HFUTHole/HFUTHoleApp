import { ToTopFAB } from '@/components/ToTopFAB'
import React, { useState, useEffect } from 'react'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'

export function AnimatedToTopFAB({ goToTop, visible }) {
  return visible ? (
    <Animated.View
      entering={SlideInRight.springify().duration(300).damping(15)}
      exiting={SlideOutRight.springify().duration(300).damping(15)}
    >
      <ToTopFAB onPress={goToTop} />
    </Animated.View>
  ) : null
}
