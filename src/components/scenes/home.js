import React from 'react';

export default class App extends React.Component {

    render(){
      return (
      	<div>
      	<head>

  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
  <meta name="description" content=""/>
  <meta name="author" content=""/>
  <meta name="google-signin-client_id" content="108407451290-hd8mqsfspv06l5al3ucvm7crd40i94l3.apps.googleusercontent.com"/>

  <title>Scrolling Nav - Start Bootstrap Template</title>

  <link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet"/>

  <link href="../css/scrolling-nav.css" rel="stylesheet"/>

</head>

<body id="page-top">
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
    <div class="container">
      <a class="navbar-brand js-scroll-trigger" href="#page-top">Track My Athlete</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link js-scroll-trigger" href="#about">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link js-scroll-trigger" href="#services">Start a Training Plan</a>
          </li>
          <li class="nav-item">
            <a class="nav-link js-scroll-trigger" href="#contact">Sign up as a coach <div className="g-signin2" data-onsuccess="onSignIn"></div></a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <header class="bg-primary text-white">
    <div class="container text-center">
      <h1>Welcome to Track My Athlete</h1>
      <p class="lead">A place to create free, shareable and customizable training plans.</p>
    </div>
  </header>

  <section id="about">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <h2>What is Track My Athlete?</h2>
          <p class="lead">Track my athlete is a platform for coaches and athletes to create
          					free, customizable, and shareable training plans in no time.</p>
          <ul>
            <li>If you are an athlete without a coach, click below to create a custom training plan that
            	can be accessed and edited anywhere at anytime.</li>
            <li>If you are a coach, click below to sign in through gmail and easily create training plans
            	for your athletes and share them in no time.</li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section id="services" class="bg-light">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <h2>Athletes, create a free shareable and custom training plan.</h2>
          <a href="/createPlan">Start here.</a>
        </div>
      </div>
    </div>
  </section>

  <section id="contact">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <h2>Sign up as a coach and start creating shareable and interactive plans for your athletes now.</h2>
          <a href="/createCoach">Start here.</a>
        </div>
      </div>
    </div>
  </section>

  <footer class="py-5 bg-dark">
    <div class="container">
      <p class="m-0 text-center text-white">Copyright &copy; Track My Athlete 2020</p>
    </div>
  </footer>

  <script src="./vendor/jquery/jquery.min.js"></script>
  <script src="./vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="./vendor/jquery-easing/jquery.easing.min.js"></script>
  <script src="../scrolling-nav.js"></script>
  <script src="https://apis.google.com/js/platform.js" async defer></script>
  <meta name="google-signin-client_id" content="108407451290-hd8mqsfspv06l5al3ucvm7crd40i94l3.apps.googleusercontent.com"/>

</body>
</div>

      );
    }
}