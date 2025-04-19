import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '実践的なフレーズ',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Kazu Languagesが厳選した、日常会話で最も使われる30の英語フレーズを学びます。
      </>
    ),
  },
  {
    title: '分かりやすい解説',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        各フレーズの意味、使い方、実際の会話例を詳しく解説します。
      </>
    ),
  },
  {
    title: '練習問題付き',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        理解度を確認できる練習問題で、確実にフレーズをマスターできます。
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
