/* eslint-disable @next/next/no-img-element */
/** @jsxImportSource @emotion/react */
import { GapVertical } from './GapVertical';
import { mq } from '../styles/mq';
import { FC } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineDownCircle } from 'react-icons/ai';
import { computeGridSize } from '../styles/grid';

interface HomeHeaderProps {}

export const HomeHeader: FC<HomeHeaderProps> = () => {
  return (
    <motion.div
      css={mq({
        display: 'flex',
        flexDirection: ['column', 'row', 'row'],
        alignItems: 'center',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
      })}
    >
      <div
        css={mq({
          width: ['65%', '50%', '50%'],
          height: ['60vh', '100vh', '100vh'],
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: ['48px', '0px', '0px'],
        })}
      >
        <img
          src="/dp.png"
          alt="Vir Srinivas Photo"
          css={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
      <motion.div
        animate={{
          opacity: 1,
        }}
        transition={{ duration: 2 }}
        css={mq({
          flexDirection: 'column',
          display: 'flex',
          alignItems: 'center',
          width: ['100%', '50%', '50%'],
          paddingTop: ['48px', '0px', '0px'],
          minHeight: ['50vh', '100%', '100%'],
        })}
      >
        <h1
          css={mq({
            fontWeight: 400,
            fontSize: ['48px', '70px', '80px'],
            margin: 0,
            zIndex: 2,
            color: 'black',
          })}
        >
          VIR SRINIVAS
        </h1>
        <GapVertical times={3} />
        <div
          css={mq({
            height: ['3px'],
            width: ['32px'],
            background: 'black',
            zIndex: 2,
          })}
        />
        <GapVertical times={3} />
        <p
          css={mq({
            margin: 0,
            fontSize: ['20px', '32px', '32px'],
            fontWeight: 200,
            zIndex: 2,
            color: 'black',
          })}
        >
          Filmmaker
        </p>
        <GapVertical times={8} />
        <p
          css={mq({
            margin: 0,
            fontSize: ['12px', '16px', '16px'],
            fontWeight: 300,
            zIndex: 2,
            color: 'black',
            fontFamily: 'Rubik',
            textAlign: 'center',
            width: ['75%', '70%', '45%'],
            lineHeight: '180%',
          })}
        >
          Vir is a young award-winning feature film writer, producer and
          director based in Sydney, Australia. He was trained at Sydney Film
          School, where he gained a Diploma of Screen and Media in 2021.
          <br />
          <br />
          Vir’s credits include Orders from Above (feature) and The Proselyte
          (short), which have screened and won awards at numerous film festivals
          worldwide.
        </p>
        <div
          css={mq({
            marginBottom: [
              computeGridSize(10),
              computeGridSize(0),
              computeGridSize(0),
            ],
          })}
        />
        <div
          css={mq({
            position: ['relative', 'absolute', 'absolute'],
            bottom: '36px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '90px',
            color: 'black',
            cursor: 'pointer',
            fontSize: '20px',
            ':hover': {
              fontSize: '24px',
              bottom: '38px',
              '& > svg': {
                width: '32px',
                height: '32px',
              },
            },
          })}
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
          }
        >
          <p css={{ margin: 0, fontWeight: 300 }}>WORK</p>
          <GapVertical times={2} />
          <AiOutlineDownCircle
            css={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              marginBottom: '-4px',
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
