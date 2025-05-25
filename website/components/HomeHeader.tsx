/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { GapVertical } from './GapVertical';
import { mq } from '../styles/mq';
import { FC } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineDownCircle } from 'react-icons/ai';
import { computeGridSize } from '../styles/grid';

interface HomeHeaderProps {}

export const HomeHeader: FC<HomeHeaderProps> = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  const scrollToWork = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div
      css={mq({
        display: 'flex',
        flexDirection: ['column', 'row', 'row'],
        alignItems: 'center',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        justifyContent: 'center',
        position: 'relative',
        padding: ['16px', '40px', '60px'],
        boxSizing: 'border-box',
      })}
    >
      {/* Navigation Bar */}
      <nav
        css={mq({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          padding: ['12px 16px', '16px 40px', '20px 60px'],
          display: 'flex',
          justifyContent: 'flex-end',
          zIndex: 10,
          boxSizing: 'border-box',
        })}
      >
        <ul
          css={{
            display: 'flex',
            listStyle: 'none',
            gap: '32px',
            margin: 0,
            padding: 0,
          }}
        >
          {['Work', 'Awards', 'Videos'].map((item, index) => (
            <li key={index}>
              <a
                href={`#${item.toLowerCase()}`}
                css={{
                  textDecoration: 'none',
                  color: 'black',
                  fontSize: '14px',
                  fontWeight: 300,
                  letterSpacing: '0.05em',
                  position: 'relative',
                  padding: '4px 0',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    '&:after': {
                      width: '100%',
                    },
                  },
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: 0,
                    height: '1px',
                    backgroundColor: 'black',
                    transition: 'width 0.3s ease',
                  },
                }}
                onClick={(e) => {
                  e.preventDefault();
                  const sectionIndex = index + 1; // Add 1 because home is 0
                  window.scrollTo({
                    top: sectionIndex * window.innerHeight,
                    behavior: 'smooth',
                  });
                }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        css={mq({
          flexDirection: 'column',
          display: 'flex',
          alignItems: 'center',
          width: ['100%', '65%', '60%'],
          paddingTop: ['40px', '0px', '0px'],
          minHeight: ['50vh', '100%', '100%'],
        })}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          css={mq({
            fontWeight: 400,
            fontSize: ['44px', '52px', '62px'],
            margin: 0,
            zIndex: 2,
            color: 'black',
            letterSpacing: '0.05em',
          })}
        >
          VIR SRINIVAS
        </motion.h1>
        <GapVertical times={3} />
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: isVisible ? 1 : 0, width: '32px' }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          css={mq({
            height: ['2px'],
            width: ['32px'],
            background: 'black',
            zIndex: 2,
          })}
        />
        <GapVertical times={3} />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          css={mq({
            margin: 0,
            fontSize: ['16px', '20px', '22px'],
            fontWeight: 200,
            zIndex: 2,
            color: 'black',
            letterSpacing: '0.05em',
          })}
        >
          Filmmaker
        </motion.p>
        <GapVertical times={10} />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          css={mq({
            margin: 0,
            fontSize: ['14px', '15px', '16px'],
            fontWeight: 300,
            zIndex: 2,
            color: 'black',
            fontFamily: 'Rubik',
            textAlign: 'center',
            width: ['80%', '75%', computeGridSize(140)],
            lineHeight: '180%',
            maxWidth: '680px',
          })}
        >
          Vir is an award-winning writer, producer and director.
          <br />
          <br />
          His credits include "ORDERS FROM ABOVE" (feature), "THE PROSELYTE"
          (short), and “GRADIENT DESCENT” (short), which have screened and
          achieved awards at numerous film festivals worldwide. ORDERS FROM
          ABOVE was distributed by Gravitas Ventures in 2022 and released
          internationally on Amazon Prime, Apple TV, Vudu, and more.
          <br />
          Vir&apos;s screenplays have also garnered acclaim and won prestigious
          screenwriting competitions with top prizes at the Fade In Awards and
          the Final Draft Big Break® Screenwriting Contest.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          css={mq({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '32px',
          })}
        >
          <a
            href="mailto:virsrinivasfilmmaker@gmail.com"
            css={{
              textDecoration: 'none',
              color: 'black',
              fontFamily: 'Rubik',
              fontWeight: 500,
              fontSize: '15px',
              border: '1px solid rgba(0,0,0,0.2)',
              padding: '10px 20px',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'rgba(0,0,0,0.05)',
              },
            }}
          >
            Contact Vir
          </a>
        </motion.div>

        <div
          css={mq({
            marginBottom: [
              computeGridSize(10),
              computeGridSize(0),
              computeGridSize(0),
            ],
          })}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          css={mq({
            position: ['relative', 'absolute', 'absolute'],
            bottom: '36px',
            textAlign: 'center',
            display: ['none', 'flex', 'flex'],
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '90px',
            color: 'black',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'all 0.3s ease',
            ':hover': {
              transform: 'translateY(4px)',
            },
          })}
          onClick={scrollToWork}
        >
          <p
            css={{
              margin: 0,
              fontWeight: 300,
              letterSpacing: '0.05em',
              fontSize: '16px',
            }}
          >
            WORK
          </p>
          <GapVertical times={2} />
          <div
            css={{
              animation: 'bounce 2s infinite',
              '@keyframes bounce': {
                '0%, 20%, 50%, 80%, 100%': {
                  transform: 'translateY(0)',
                },
                '40%': {
                  transform: 'translateY(-10px)',
                },
                '60%': {
                  transform: 'translateY(-5px)',
                },
              },
            }}
          >
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
    </div>
  );
};
