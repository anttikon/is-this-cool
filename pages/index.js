import React, { useState } from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import styled from 'styled-components'
import { PreloadFonts } from '../components/PreloadFonts'
import { MainHeader, SmallHeader } from '../components/headers'
import InputWithButton from '../components/InputWithButton'
import { ANSWER_STATE } from '../components/constants'
import { GlobalStyle, containerBackground, fade } from '../components/theme'

const Logo = styled.img`
  width: 25%;
  align-self: flex-start;
  padding-left: 20px;
  margin-top: 10px;
`

const Img = styled.img`
  width: 100%;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${containerBackground};
  min-height: 150px;
  margin: 20px;
  max-width: 800px;
  align-self: center;
`

const P = styled.p`
  animation: ${fade} 1s linear;
  font-size: 18px;
  text-align: center;
`

const PageContainer = styled.div`
  animation: ${fade} 1s linear;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 15px;
`

const BlackSection = styled(Section)`
  background-color: black;
  padding-top: 80px;
  padding-bottom: 80px;
  max-width: 100%;
  width: 100%;
  margin-top: 0;
  margin-bottom: 0;

  ${SmallHeader} {
    color: white;
  }
  ${P} {
    color: white;
  }
`

const Index = () => {
  const [answerState, setAnswerState] = useState(ANSWER_STATE.INITIAL)

  const postSlackMessage = async username => {
    if (!username || !username.length) {
      return
    }
    setAnswerState(ANSWER_STATE.SENDING)
    try {
      const response = await fetch(`/api/message?displayName=${username}`)
      if (response.status === 200) {
        setAnswerState(ANSWER_STATE.READY)
      } else {
        setAnswerState(ANSWER_STATE.ERROR)
      }
    } catch (e) {
      setAnswerState(ANSWER_STATE.ERROR)
    }
  }

  const renderInput = answerState !== ANSWER_STATE.READY

  return (
    <PageContainer>
      <GlobalStyle />
      <Head>
        <title>What do you think?</title>
      </Head>
      <Logo src="/logo.svg" />
      <MainHeader>Pair programming</MainHeader>
      <Img src="/bxr1337.png" />
      <Section>
        <SmallHeader>Basic Freemium Edition</SmallHeader>
        <P>
          Integer iaculis dui orci. Pellentesque scelerisque varius nisl, nec
          laoreet lorem interdum at. Maecenas vestibulum lectus ut leo bibendum
          sollicitudin. Etiam consectetur vitae lorem a aliquet. Phasellus
          fringilla, felis imperdiet feugiat rutrum, urna justo varius odio, et
          sodales magna eros id mi. Proin enim enim, vestibulum sed ullamcorper
          sit amet, sodales non ex. Nam molestie varius ante sed dignissim.
          Nulla nec nunc sed ligula eleifend luctus quis sed risus. Etiam
          placerat efficitur velit, aliquet consectetur nulla semper et. Etiam
          non consequat sem. Curabitur condimentum semper magna at porta. Aenean
          suscipit diam massa, ac finibus elit maximus in.
        </P>
        <P>
          Sed vitae urna nulla. Proin euismod vehicula maximus. Sed consectetur
          aliquet sem id lobortis. Pellentesque tincidunt, eros eget placerat
          eleifend, nibh dui efficitur ex, non sagittis justo sem quis nisl.
          Aliquam ut sollicitudin arcu. Duis nisi tellus, rhoncus eu odio sed,
          posuere sollicitudin urna. Phasellus suscipit lectus nec ante
          imperdiet vehicula. Nulla odio nisi, semper vitae ex eget, commodo
          luctus ligula. Nulla a efficitur lectus. Quisque arcu odio, laoreet
          vel enim sed, fringilla eleifend odio. Fusce posuere auctor turpis nec
          dignissim. Fusce semper tincidunt sapien id convallis. Vestibulum
          mattis id velit vulputate congue.
        </P>
      </Section>
      <Img src="/bxr1337.png" />
      <Section>
        <SmallHeader>Battlecruiser X Robot Hand</SmallHeader>
        <P>
          Suspendisse potenti. Aenean fermentum iaculis nibh, in fermentum nibh
          pharetra ut. Ut id turpis ut ante interdum interdum. Pellentesque
          ullamcorper suscipit arcu, a elementum orci imperdiet eu. Aliquam vel
          enim feugiat, egestas tellus vel, convallis velit. Morbi auctor ornare
          diam ac finibus. Donec vitae porta lacus. Integer volutpat massa at
          feugiat tempor. Vivamus tincidunt odio id neque accumsan vulputate. Ut
          id fringilla magna. Suspendisse porta lectus sed finibus venenatis.
          Sed tempor neque vitae convallis euismod. Mauris scelerisque congue
          turpis quis maximus.
        </P>
      </Section>
      <Img src="/bxr1337.png" />
      <Section>
        <SmallHeader>BxRHRWSE</SmallHeader>
        <P>
          Mauris eu sapien a ipsum feugiat viverra sit amet a augue. Morbi
          imperdiet metus in placerat cursus. Nam tincidunt purus quis faucibus
          vulputate. Sed ante elit, sodales ac posuere ut, tempus maximus nisl.
          Proin ullamcorper fringilla neque eget euismod. Nam porttitor blandit
          dolor, et blandit orci blandit at. Aenean laoreet dictum urna. Donec
          elit ex, pulvinar id nulla in, tempor tincidunt leo. Donec sed nisl
          porttitor, ornare nisl sit amet, dignissim odio. Aliquam lacus enim,
          auctor vitae accumsan nec, porttitor ut ipsum. Donec sed fringilla
          est. Duis porttitor tortor id lorem fringilla mattis. Nullam vehicula
          ante sit amet tortor eleifend, sit amet scelerisque urna lobortis.
          Aenean ultrices nunc ut purus aliquam, quis posuere neque varius.
        </P>
      </Section>
      <Img src="/bxr1337.png" />
      <BlackSection>
        <SmallHeader>Answer now!</SmallHeader>
        <InputWithButton
          placeholder="Enter your slack nick here"
          visible={renderInput}
          onSubmit={value => postSlackMessage(value)}
        />
      </BlackSection>
    </PageContainer>
  )
}

export default PreloadFonts(Index)
