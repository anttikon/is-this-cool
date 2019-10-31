import React, { useState, useEffect } from 'react'

export const PreloadFonts = Component => props => {
  const [isFontLoaded, setIsFontLoaded] = useState(false)
  const [isBoldFontLoaded, setIsBoldFontLoaded] = useState(false)

  useEffect(() => {
    new FontFace('Nunito Sans', 'url(/NunitoSans-Regular.ttf)')
      .load()
      .then(() => setIsFontLoaded(true))
  }, [isFontLoaded])

  useEffect(() => {
    new FontFace('Nunito Sans', 'url(/NunitoSans-SemiBold.ttf)')
      .load()
      .then(() => setIsBoldFontLoaded(true))
  }, [isBoldFontLoaded])

  return isFontLoaded && isBoldFontLoaded ? <Component {...props} /> : null
}
