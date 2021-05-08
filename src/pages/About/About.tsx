import styles from './About.less';
import { createRef, useEffect } from 'react';
import anime from 'animejs';
import ReactPlayer from 'react-player';

const About = () => {
  const threeRef: any = createRef();
  let _status = false;

  const scrollToContent = () => {
    _status = true;
    anime({
      targets: 'html,body',
      easing: 'easeInQuad',
      duration: 300,
      scrollTop: [0, threeRef.current?.offsetHeight | 0],
      complete: () => {
        _status = false;
      },
    });
  };

  const handleScroll = () => {
    if (_status) return false;
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const threeHeight = document.documentElement.clientHeight;
    if (scrollTop < threeHeight) {
      _status = true;
      anime({
        targets: 'html,body',
        easing: 'easeInQuad',
        duration: 300,
        scrollTop: [scrollTop, 0],
        complete: () => {
          _status = false;
        },
      });
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    const container3d = document.getElementById('container-3d');
    window['init3d'](container3d);
  }, []);
  useEffect(() => {
    const header = document.getElementById('layout-header');
    header?.classList.add('about-header');
    return () => {
      header?.classList.remove('about-header');
    };
  }, []);
  return (
    <div className={styles.container}>
      <div id="container-3d" ref={threeRef} className={styles.header}>
        <div className={styles.threeDContainer} onClick={scrollToContent}>
          <img
            src={require('@/images/down-icon.png')}
            className={styles.threeDImg}
            alt=""
          />
        </div>
      </div>
      <div className={styles.content}>
        <img
          src={require('@/images/about-content-header.png')}
          style={{ marginTop: 108 }}
        />
        <img
          src={require('@/images/about-image-01.png')}
          style={{ marginTop: 70, marginBottom: 120 }}
        />
        <ReactPlayer
          url="/video/umx-about.mp4"
          width="100%"
          style={{ background: '#8f8f8f' }}
          height={1000}
          controls
        />
        <img
          src={require('@/images/about-image-02.png')}
          style={{ marginTop: 135 }}
        />
        <img
          src={require('@/images/about-image-03.png')}
          style={{ marginTop: 80 }}
        />
        <img
          src={require('@/images/about-image-04.png')}
          style={{ marginTop: 60 }}
        />
        <img
          src={require('@/images/about-image-05.png')}
          style={{ marginTop: 60, marginBottom: 170 }}
        />
      </div>
    </div>
  );
};

export default About;
