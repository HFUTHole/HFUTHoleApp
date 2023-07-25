import { ToTopFAB } from '@/components/ToTopFAB'
import React, { useState, useEffect } from 'react'

export function HoleToTopFAB({ goToTop }) {
  return <ToTopFAB onPress={goToTop} />
}
