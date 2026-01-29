'use client'

import { useState, useEffect, useMemo } from 'react'
import styles from './page.module.css'

/**
 * User answers for the longevity questionnaire
 */
interface Answers {
  age: number
  coffee: number
  sleep: number
  exercise: number
  stress: number
  diet: number
  social: number
  screen: number
}

/**
 * Question configuration for the survey
 */
interface Question {
  id: keyof Answers
  question: string
  subtext: string
  type: 'number' | 'range'
  min: number
  max: number
  labels?: [string, string]
}

// Random emojis displayed during the questionnaire
const RANDOM_EMOJIS = ['💀', '🔥', '😭', '💅', '✨', '🤡', '💯', '😤', '🥴', '💸'] as const

// Default answer values for the questionnaire
const DEFAULT_ANSWERS: Answers = {
  age: 25,
  coffee: 2,
  sleep: 7,
  exercise: 2,
  stress: 3,
  diet: 3,
  social: 3,
  screen: 6
}

// Base life expectancy (average)
const BASE_LIFE_EXPECTANCY = 78

// Modifier weights for each health factor
const HEALTH_MODIFIERS = {
  coffee: { optimal: 2, weight: -0.5 },
  sleep: { optimal: 7, weight: -1.5 },
  exercise: { optimal: 3, weight: 0.8 },
  stress: { optimal: 5, weight: -1.2 },
  diet: { optimal: 5, weight: 1.5 },
  social: { optimal: 5, weight: 0.3 },
  screen: { optimal: 4, weight: -0.4 }
} as const

/**
 * Questionnaire configuration for all survey questions
 */
const QUESTIONS: Question[] = [
  {
    id: 'age',
    question: 'ok first things first how old r u',
    subtext: '(pls be honest we can tell)',
    type: 'number',
    min: 1,
    max: 120
  },
  {
    id: 'coffee',
    question: 'how much coffee u drinkin',
    subtext: '(energy drinks count too btw)',
    type: 'range',
    min: 0,
    max: 10,
    labels: ['none', 'too much']
  },
  {
    id: 'sleep',
    question: 'how many hours u sleep',
    subtext: '(scrolling tiktok doesnt count as sleep)',
    type: 'range',
    min: 0,
    max: 12,
    labels: ['0', '12']
  },
  {
    id: 'exercise',
    question: 'u work out?',
    subtext: '(walking to the kitchen doesnt count)',
    type: 'range',
    min: 0,
    max: 7,
    labels: ['never', 'everyday']
  },
  {
    id: 'stress',
    question: 'how stressed r u',
    subtext: '(1 = chill vibes, 10 = about to lose it)',
    type: 'range',
    min: 1,
    max: 10,
    labels: ['1', '10']
  },
  {
    id: 'diet',
    question: 'u eat healthy?',
    subtext: '(1 = only ubereats, 10 = meal prep queen)',
    type: 'range',
    min: 1,
    max: 10,
    labels: ['1', '10']
  },
  {
    id: 'social',
    question: 'how social r u',
    subtext: '(1 = hermit mode, 10 = main character)',
    type: 'range',
    min: 1,
    max: 10,
    labels: ['1', '10']
  },
  {
    id: 'screen',
    question: 'phone screen time?',
    subtext: '(we know its bad just admit it)',
    type: 'range',
    min: 0,
    max: 16,
    labels: ['0', '16+']
  }
]

/**
 * Calculates predicted death age based on lifestyle factors
 * @param answers User's answers to the questionnaire
 * @returns Predicted age of death (constrained between current age + 1 and 120)
 */
function calculateDeathAge(answers: Answers): number {
  let modifier = 0

  // Calculate modifier based on deviation from optimal values for each factor
  modifier += (answers.coffee - HEALTH_MODIFIERS.coffee.optimal) * HEALTH_MODIFIERS.coffee.weight
  modifier += (answers.sleep - HEALTH_MODIFIERS.sleep.optimal) * HEALTH_MODIFIERS.sleep.weight
  modifier += (answers.exercise - HEALTH_MODIFIERS.exercise.optimal) * HEALTH_MODIFIERS.exercise.weight
  modifier += (answers.stress - HEALTH_MODIFIERS.stress.optimal) * HEALTH_MODIFIERS.stress.weight
  modifier += (answers.diet - HEALTH_MODIFIERS.diet.optimal) * HEALTH_MODIFIERS.diet.weight
  modifier += (answers.social - HEALTH_MODIFIERS.social.optimal) * HEALTH_MODIFIERS.social.weight
  modifier += (answers.screen - HEALTH_MODIFIERS.screen.optimal) * HEALTH_MODIFIERS.screen.weight

  const calculatedAge = Math.round(BASE_LIFE_EXPECTANCY + modifier)
  
  // Ensure the result is realistic: at least 1 year from current age, max 120
  return Math.max(answers.age + 1, Math.min(calculatedAge, 120))
}

/**
 * Returns humorous roast messages based on predicted death age
 * @param age Predicted death age
 * @returns Array of roast messages
 */
function getRoast(age: number): string[] {
  if (age < 50) return ['bro 💀', 'u aint making it past 50', 'might wanna reconsider everything']
  if (age < 60) return ['yikes', 'those life choices catching up', 'maybe touch grass?']
  if (age < 70) return ['mid', 'just mid', 'nothing special']
  if (age < 80) return ['average', 'congrats i guess?', 'basic lifespan achieved']
  if (age < 90) return ['decent', 'might make it to retirement', 'respect']
  if (age < 100) return ['living ur best life', 'goals fr', 'built different']
  return ['legend', 'u built different', 'actually how']
}

/**
 * Main component for the longevity calculator app
 */
export default function Home() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>(DEFAULT_ANSWERS)
  const [deathAge, setDeathAge] = useState<number | null>(null)
  const [randomEmoji, setRandomEmoji] = useState('💀')

  // Update emoji on each step change
  useEffect(() => {
    setRandomEmoji(RANDOM_EMOJIS[Math.floor(Math.random() * RANDOM_EMOJIS.length)])
  }, [step])

  const currentQuestion = useMemo(() => QUESTIONS[step], [step])

  /**
   * Handles moving to the next question or calculating result
   */
  const handleNext = () => {
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1)
    } else {
      const age = calculateDeathAge(answers)
      setDeathAge(age)
    }
  }

  /**
   * Handles moving back to the previous question
   */
  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  /**
   * Updates an answer value
   */
  const handleChange = (id: keyof Answers, value: number) => {
    setAnswers({ ...answers, [id]: value })
  }

  /**
   * Resets the questionnaire to start over
   */
  const handleReset = () => {
    setStep(0)
    setDeathAge(null)
    setAnswers(DEFAULT_ANSWERS)
  }

  // Result screen
  if (deathAge !== null) {
    const roasts = getRoast(deathAge)
    return (
      <div className={styles.container}>
        <div className={styles.resultCard}>
          <div className={styles.resultEmoji}>{randomEmoji}</div>
          <h1 className={styles.resultTitle}>ur gonna die at</h1>
          <div className={styles.deathAge}>{deathAge}</div>
          <div className={styles.roastContainer}>
            {roasts.map((roast, i) => (
              <p key={i} className={styles.roast}>{roast}</p>
            ))}
          </div>
          <p className={styles.disclaimer}>
            *this is 100% real science trust
          </p>
          <button 
            className={styles.button}
            onClick={handleReset}
            aria-label="Restart questionnaire"
          >
            do it again (maybe lie this time)
          </button>
        </div>
      </div>
    )
  }

  // Questionnaire screen
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          <span className={styles.titleMain}>when r u gonna die</span>
          <span className={styles.titleSub}>death age calculator</span>
        </h1>
        
        <div className={styles.progressContainer}>
          <div className={styles.progressText}>
            {step + 1}/{QUESTIONS.length}
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
              role="progressbar"
              aria-valuenow={step + 1}
              aria-valuemin={1}
              aria-valuemax={QUESTIONS.length}
            />
          </div>
        </div>

        <div className={styles.questionContainer}>
          <div className={styles.emoji} aria-hidden="true">{randomEmoji}</div>
          <h2 className={styles.question}>
            {currentQuestion.question}
          </h2>
          {currentQuestion.subtext && (
            <p className={styles.subtext}>{currentQuestion.subtext}</p>
          )}
          
          {currentQuestion.type === 'number' ? (
            <input
              type="number"
              min={currentQuestion.min}
              max={currentQuestion.max}
              value={answers[currentQuestion.id]}
              onChange={(e) => handleChange(currentQuestion.id, parseInt(e.target.value) || 0)}
              className={styles.numberInput}
              aria-label={currentQuestion.question}
            />
          ) : (
            <div className={styles.rangeContainer}>
              <div className={styles.rangeValue} aria-live="polite">
                {answers[currentQuestion.id]}
              </div>
              <input
                type="range"
                min={currentQuestion.min}
                max={currentQuestion.max}
                value={answers[currentQuestion.id]}
                onChange={(e) => handleChange(currentQuestion.id, parseInt(e.target.value))}
                className={styles.rangeInput}
                aria-label={currentQuestion.question}
              />
              <div className={styles.rangeLabels} aria-hidden="true">
                <span>{currentQuestion.labels?.[0]}</span>
                <span>{currentQuestion.labels?.[1]}</span>
              </div>
            </div>
          )}
        </div>

        <div className={styles.buttonContainer}>
          {step > 0 && (
            <button 
              className={styles.buttonSecondary} 
              onClick={handleBack}
              aria-label="Go to previous question"
            >
              back
            </button>
          )}
          <button 
            className={styles.button} 
            onClick={handleNext}
            aria-label={step === QUESTIONS.length - 1 ? 'Calculate result' : 'Go to next question'}
          >
            {step === QUESTIONS.length - 1 ? 'show me' : 'next'}
          </button>
        </div>
      </div>
    </div>
  )
}
