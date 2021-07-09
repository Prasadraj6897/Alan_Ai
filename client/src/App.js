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
    </div>
  );
}

export default App;
