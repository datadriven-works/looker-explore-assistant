import React from 'react'
import { SpaceVertical } from '@looker/components'
import { useHistory } from 'react-router-dom'
import styles from './style.module.scss'

const LandingPage = () => {
  const history = useHistory()
  const docs = [
    {
      title: 'No Code Prompt Tuning',
      model: 'Vertex AI Generative AI Studio',
      description:
        'No code prompt tuning of foundational model with generated Python code for engineer hand off.',
      doc: 'https://cloud.google.com/vertex-ai/docs/generative-ai/learn/generative-ai-studio',
    },
    {
      title: 'Generate Text',
      model: 'gemini-pro',
      description:
        'Multi-modal Model by Google. Used to generate the Explore query URL. This is done based off a minimal set of question answer examples that are fed into the prompt context.',
      doc: 'https://developers.generativeai.google/tutorials/text_quickstart',
    },
  ]

  const handleBegin = () => {
    history.push('/assistant')
  }

  return (
    <SpaceVertical>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignContent: 'center',
          width: '100%',
          height: '100%',
          padding: '2rem',
          paddingTop: '10rem',
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: '40vw',
          }}
        >
          <span className={styles.title}>Explore Assistant Demo</span>
          <span className={styles.subTitle}>
            Powered by Generative AI with Google
          </span>
          <button
            className={styles.customButton}
            style={{ backgroundColor: 'rgb(26,115,232)' }}
            onClick={handleBegin}
          >
            Begin
          </button>
          {docs.map((doc, index) => {
            return (
              <a href={doc.doc} target="_blank" rel="noreferrer" key={index}>
                <div
                  style={{
                    cursor: 'pointer',
                    width: '90%',
                    height: '18vh',
                    backgroundColor: 'white',
                    marginTop: '2rem',
                    borderRadius: '5px',
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <div
                    style={{
                      width: '20%',
                      height: 'auto',
                      borderRight: '1px solid #ccc',
                    }}
                  >
                    <img
                      height="70%"
                      width="auto"
                      src={
                        'https://lh3.googleusercontent.com/-1brN-k2sapOWO4gfdJKGEH8kZbfFjrzEMjNs1dl4u64PBH-yxVmB5vG2aHDatRudSByL3lwViUg1w'
                      }
                    />
                  </div>
                  <div
                    style={{
                      paddingTop: '1rem',
                      paddingLeft: '1rem',
                      width: '80%',
                      height: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <span className={styles.heading}>{doc.title}</span>
                    <span className={styles.subHeading}>{doc.model}</span>
                    <p
                      style={{
                        fontSize: '0.8rem',
                        width: 'auto',
                        height: 'auto',
                        color: 'black',
                        opacity: 0.8,
                      }}
                    >
                      {doc.description}
                    </p>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </SpaceVertical>
  )
}

export default LandingPage
