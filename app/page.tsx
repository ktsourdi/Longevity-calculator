'use client'

import { useState } from 'react'
import styles from './page.module.css'

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

export default function Home() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({
    age: 25,
    coffee: 2,
    sleep: 7,
    exercise: 2,
    stress: 3,
    diet: 3,
    social: 3,
    screen: 6
  })
  const [deathAge, setDeathAge] = useState<number | null>(null)

  const questions = [
    {
      id: 'age',
      question: 'How old are you? (be honest, we&apos;ll know if you&apos;re lying)',
      type: 'number',
      min: 1,
      max: 120
    },
    {
      id: 'coffee',
      question: 'How many cups of coffee do you drink per day? (yes, energy drinks count)',
      type: 'range',
      min: 0,
      max: 10,
      labels: ['0', '10+']
    },
    {
      id: 'sleep',
      question: 'How many hours of sleep do you get per night? (be honest, TikTok doesn&apos;t count as sleep)',
      type: 'range',
      min: 0,
      max: 12,
      labels: ['0', '12']
    },
    {
      id: 'exercise',
      question: 'How often do you exercise per week? (walking to the fridge doesn&apos;t count)',
      type: 'range',
      min: 0,
      max: 7,
      labels: ['Never', 'Daily']
    },
    {
      id: 'stress',
      question: 'Rate your stress level (1 = zen master, 10 = about to have a breakdown)',
      type: 'range',
      min: 1,
      max: 10,
      labels: ['1', '10']
    },
    {
      id: 'diet',
      question: 'How healthy is your diet? (1 = only DoorDash, 10 = actually meal preps)',
      type: 'range',
      min: 1,
      max: 10,
      labels: ['1', '10']
    },
    {
      id: 'social',
      question: 'How social are you? (1 = hermit mode, 10 = main character energy)',
      type: 'range',
      min: 1,
      max: 10,
      labels: ['1', '10']
    },
    {
      id: 'screen',
      question: 'How many hours per day do you spend on your phone? (we know it&apos;s a lot)',
      type: 'range',
      min: 0,
      max: 16,
      labels: ['0', '16+']
    }
  ]

  const calculateDeathAge = (answers: Answers): number => {
    let baseAge = 78
    let modifier = 0

    modifier += (answers.coffee - 2) * -0.5
    modifier += (answers.sleep - 7) * -1.5
    modifier += (answers.exercise - 3) * 0.8
    modifier += (answers.stress - 5) * -1.2
    modifier += (answers.diet - 5) * 1.5
    modifier += (answers.social - 5) * 0.3
    modifier += (answers.screen - 4) * -0.4

    const calculatedAge = Math.round(baseAge + modifier)
    return Math.max(answers.age + 1, Math.min(calculatedAge, 120))
  }

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      const age = calculateDeathAge(answers)
      setDeathAge(age)
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const handleChange = (id: keyof Answers, value: number) => {
    setAnswers({ ...answers, [id]: value })
  }

  const getRoast = (age: number): string => {
    if (age < 50) return 'Bro, you&apos;re not making it past 50 💀'
    if (age < 60) return 'Yikes, might want to reconsider those life choices'
    if (age < 70) return 'Not great, not terrible. Just... mid.'
    if (age < 80) return 'Average lifespan achieved. Congrats, I guess?'
    if (age < 90) return 'Decent! You might actually make it to retirement'
    if (age < 100) return 'Living your best life! Respect.'
    return 'Legend status. You&apos;re built different.'
  }

  const currentQuestion = questions[step]

  if (deathAge !== null) {
    return (
      <div className={styles.container}>
        <div className={styles.resultCard}>
          <h1 className={styles.title}>Your Death Age Prediction</h1>
          <div className={styles.deathAge}>{deathAge}</div>
          <p className={styles.roast}>{getRoast(deathAge)}</p>
          <p className={styles.disclaimer}>
            *This is 100% scientific and definitely not made up on the spot
          </p>
          <button 
            className={styles.button}
            onClick={() => {
              setStep(0)
              setDeathAge(null)
              setAnswers({
                age: 25,
                coffee: 2,
                sleep: 7,
                exercise: 2,
                stress: 3,
                diet: 3,
                social: 3,
                screen: 6
              })
            }}
          >
            Try Again (Maybe Lie This Time)
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Death Age Predictor</h1>
        <p className={styles.subtitle}>
          Find out when you&apos;ll die (totally accurate, trust us)
        </p>
        
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className={styles.questionContainer}>
          <h2 className={styles.question}>
            {currentQuestion.question}
          </h2>
          
          {currentQuestion.type === 'number' ? (
            <input
              type="number"
              min={currentQuestion.min}
              max={currentQuestion.max}
              value={answers[currentQuestion.id as keyof Answers]}
              onChange={(e) => handleChange(currentQuestion.id as keyof Answers, parseInt(e.target.value) || 0)}
              className={styles.numberInput}
            />
          ) : (
            <div className={styles.rangeContainer}>
              <input
                type="range"
                min={currentQuestion.min}
                max={currentQuestion.max}
                value={answers[currentQuestion.id as keyof Answers]}
                onChange={(e) => handleChange(currentQuestion.id as keyof Answers, parseInt(e.target.value))}
                className={styles.rangeInput}
              />
              <div className={styles.rangeLabels}>
                <span>{currentQuestion.labels?.[0]}</span>
                <span className={styles.rangeValue}>
                  {answers[currentQuestion.id as keyof Answers]}
                </span>
                <span>{currentQuestion.labels?.[1]}</span>
              </div>
            </div>
          )}
        </div>

        <div className={styles.buttonContainer}>
          {step > 0 && (
            <button className={styles.buttonSecondary} onClick={handleBack}>
              Back
            </button>
          )}
          <button className={styles.button} onClick={handleNext}>
            {step === questions.length - 1 ? 'See My Death Age' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}
