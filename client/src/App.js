import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';

import useStyles from './styles';

function App() {
	const classes = useStyles();
	const [newsArticles, setNewsArticles] = useState([]);
	const [activeArticle, setActiveArticle] = useState(0);
	const [isOpen, setIsOpen] = useState(false);


	useEffect(() => {
		alanBtn({
			key: 'bfe67ba85189f9dc71c3b395ff2bb57c2e956eca572e1d8b807a3e2338fdd0dc/stage',
			onCommand: ({ command, articles, number }) => {
				if (command === 'newHeadlines') {
					setNewsArticles(articles);
					setActiveArticle(-1);
				} 
				else if (command === 'instructions') {
					setIsOpen(true);
				}
				else if (command === 'highlight') {
					setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
				}
				else if (command === 'open') {
					const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
					const article = articles[parsedNumber - 1];

					if (parsedNumber > articles.length) {
						alanBtn().playText('Please try that again...');
					} 
					else if (article) {
						window.open(article.url, '_blank');
						alanBtn().playText('Opening...');
					} 
					else {
						alanBtn().playText('Please try that again...');
					}
				}
			}
		})
	},[])


  return (
    <div>
		<div className={classes.logoContainer}>
			{newsArticles.length ? (
				<div className={classes.infoContainer}>
				<div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
				<div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
				</div>
			) : null}
			<img src="https://i0.wp.com/synqqblog.wpcomstaging.com/wp-content/uploads/2019/11/preview.jpg?fit=1200%2C630&ssl=1" className={classes.alanLogo} alt="logo" />
		</div> 
	  <NewsCards articles={newsArticles} activeArticle={activeArticle}/>

	  {!newsArticles.length ? (
        <div className={classes.footer}>
          <Typography variant="body1" component="h2">
            Created by
            <a className={classes.link} href="https://www.linkedin.com/in/adrian-hajdin/"> Prasad R</a> -
            <a className={classes.link} href="http://youtube.com/javascriptmastery"> JavaScript Mastery</a>
          </Typography>
          <img className={classes.image} height="50px" alt="JSMastery logo" src="data:image/png;base64,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"  />
        </div>
      ) : null}

    </div>
  );
}

export default App;
