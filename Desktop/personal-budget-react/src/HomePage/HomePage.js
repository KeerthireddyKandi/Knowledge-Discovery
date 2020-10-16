import React from 'react';

import Chartjs from '../Chartjs/Chart';
import D3js from '../D3js/D3';

function HomePage() {
  return (
    <div className="container center">

        <div className="page-area">


            <article className="text-box">
                <h1>Stay on track</h1>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </article>
    
            <article className="text-box">
                <h1>Alerts</h1>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </article>
    
            <article className="text-box">
                <h1>D3JS Pie Chart</h1>
     
                    <D3js/>
          
            </article>
    
            <article className="text-box">
                <h1>Chart</h1>
                <p>
                 <Chartjs/>
                </p>
            </article>

        </div>

    </div>
  );
}

export default HomePage;
