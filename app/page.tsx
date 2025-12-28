'use client'

import { useState, useEffect } from 'react'
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

const randomEmojis = ['💀', '🔥', '😭', '💅', '✨', '🤡', '💯', '😤', '🥴', '💸']

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
  const [randomEmoji, setRandomEmoji] = useState('💀')

  useEffect(() => {
    setRandomEmoji(randomEmojis[Math.floor(Math.random() * randomEmojis.length)])
  }, [step])

  const questions = [
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

  const getRoast = (age: number): string[] => {
    if (age < 50) return ['bro 💀', 'u aint making it past 50', 'might wanna reconsider everything']
    if (age < 60) return ['yikes', 'those life choices catching up', 'maybe touch grass?']
    if (age < 70) return ['mid', 'just mid', 'nothing special']
    if (age < 80) return ['average', 'congrats i guess?', 'basic lifespan achieved']
    if (age < 90) return ['decent', 'might make it to retirement', 'respect']
    if (age < 100) return ['living ur best life', 'goals fr', 'built different']
    return ['legend', 'u built different', 'actually how']
  }

  const currentQuestion = questions[step]

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
            do it again (maybe lie this time)
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          <span className={styles.titleMain}>when r u gonna die</span>
          <span className={styles.titleSub}>death age calculator</span>
        </h1>
        
        <div className={styles.progressContainer}>
          <div className={styles.progressText}>
            {step + 1}/{questions.length}
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${((step + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className={styles.questionContainer}>
          <div className={styles.emoji}>{randomEmoji}</div>
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
              value={answers[currentQuestion.id as keyof Answers]}
              onChange={(e) => handleChange(currentQuestion.id as keyof Answers, parseInt(e.target.value) || 0)}
              className={styles.numberInput}
            />
          ) : (
            <div className={styles.rangeContainer}>
              <div className={styles.rangeValue}>
                {answers[currentQuestion.id as keyof Answers]}
              </div>
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
                <span>{currentQuestion.labels?.[1]}</span>
              </div>
            </div>
          )}
        </div>

        <div className={styles.buttonContainer}>
          {step > 0 && (
            <button className={styles.buttonSecondary} onClick={handleBack}>
              back
            </button>
          )}
          <button className={styles.button} onClick={handleNext}>
            {step === questions.length - 1 ? 'show me' : 'next'}
          </button>
        </div>
      </div>
    </div>
  )
}
