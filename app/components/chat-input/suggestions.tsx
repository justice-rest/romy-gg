"use client"

import { PromptSuggestion } from "@/components/prompt-kit/prompt-suggestion"
import { TRANSITION_SUGGESTIONS } from "@/lib/motion"
import { AnimatePresence, motion } from "motion/react"
import React, { memo, useCallback, useMemo } from "react"
import { SUGGESTIONS as SUGGESTIONS_CONFIG } from "../../../lib/config"

type SuggestionsProps = {
  onValueChange: (value: string) => void
  onSuggestion: (suggestion: string) => void
  value?: string
}

const MotionPromptSuggestion = motion.create(PromptSuggestion)

export const Suggestions = memo(function Suggestions({
  onValueChange,
  onSuggestion,
  value,
}: SuggestionsProps) {
  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      onSuggestion(suggestion)
      onValueChange("")
    },
    [onSuggestion, onValueChange]
  )

  // Flatten all suggestions from all categories into a single array
  const allSuggestions = useMemo(() => {
    return SUGGESTIONS_CONFIG.flatMap((category) => category.items)
  }, [])

  const suggestionsGrid = useMemo(
    () => (
      <motion.div
        key="suggestions-grid"
        className="flex w-full max-w-full flex-nowrap justify-start gap-2 overflow-x-auto px-2 md:mx-auto md:max-w-2xl md:flex-wrap md:justify-center md:pl-0"
        initial="initial"
        animate="animate"
        variants={{
          initial: { opacity: 0, y: 10, filter: "blur(4px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
        transition={TRANSITION_SUGGESTIONS}
        style={{
          scrollbarWidth: "none",
        }}
      >
        {allSuggestions.map((suggestion, index) => (
          <MotionPromptSuggestion
            key={suggestion}
            onClick={() => handleSuggestionClick(suggestion)}
            className="capitalize"
            initial="initial"
            animate="animate"
            transition={{
              ...TRANSITION_SUGGESTIONS,
              delay: index * 0.02,
            }}
            variants={{
              initial: { opacity: 0, scale: 0.8 },
              animate: { opacity: 1, scale: 1 },
            }}
          >
            {suggestion}
          </MotionPromptSuggestion>
        ))}
      </motion.div>
    ),
    [allSuggestions, handleSuggestionClick]
  )

  return (
    <AnimatePresence mode="wait">
      {suggestionsGrid}
    </AnimatePresence>
  )
})
