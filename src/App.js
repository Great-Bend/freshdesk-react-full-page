import React, { useState, useEffect } from 'react';
import './App.css';
import HelloUser from './components/HelloUser'

const Fullpage = () => {
  return(
    <div>Full Page App</div>
  )
}

const App = () => {

  const [loaded, setLoaded] = useState(false);
  const [child, setChild] = useState(<h3>App is loading</h3>)

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.freshdev.io/fdk/2.0/assets/fresh_client.js';
    script.addEventListener('load', () => setLoaded(true));
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
		if (!loaded) return;
		app.initialized().then((client) => {
			client.instance.context().then(function (data) {
				let location = data.location;
				console.log("location", location)

				if (location === "ticket_sidebar") {
					setChild(<HelloUser client={client} />);
				}
				if (location === "full_page_app") {
					setChild(<Fullpage client={client} />);
				}
			});
		});
	}, [loaded]);

  return (
    <div>
      {child}
    </div>
  )
}

export default App;
