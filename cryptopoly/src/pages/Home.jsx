import React, { useState, useEffect } from "react";
import howUseData from "../data/howUse.json";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 1,
    minutes: 1,
    seconds: 59,
  });

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        const { days, hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          return { ...prevTime, seconds: seconds - 1 };
        } else if (minutes > 0) {
          return { days, hours, minutes: minutes - 1, seconds: 59 };
        } else if (hours > 0) {
          return { days, hours: hours - 1, minutes: 59, seconds: 59 };
        } else if (days > 0) {
          return { days: days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          clearInterval(countdownInterval);
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  return (
    <div className="text-white min-h-screen">
      {/* Countdown Offer Banner */}
      <div className="bg-black text-white h-16 flex flex-col items-center justify-center">
        <p className="text-sm font-medium tracking-wide mb-1">
          Hurry up! Offer expires soon:
        </p>
        <div className="flex gap-6 text-sm font-medium">
          <div className="flex flex-col items-center">
            <span className="countdown font-mono text-xl">
              <span style={{ "--value": timeLeft.days }}></span>
            </span>
            <span className="text-xs mt-1 uppercase">Days</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="countdown font-mono text-xl">
              <span style={{ "--value": timeLeft.hours }}></span>
            </span>
            <span className="text-xs mt-1 uppercase">Hours</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="countdown font-mono text-xl">
              <span style={{ "--value": timeLeft.minutes }}></span>
            </span>
            <span className="text-xs mt-1 uppercase">Minutes</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="countdown font-mono text-xl">
              <span style={{ "--value": timeLeft.seconds }}></span>
            </span>
            <span className="text-xs mt-1 uppercase">Seconds</span>
          </div>
        </div>
      </div>

      <Navbar />

      {/* Hero Section with Animated Blobs */}
      <div className="hero relative min-h-screen bg-background-light overflow-hidden flex items-center justify-center">
        {/* Blobs Animation */}
        <div className="absolute top-[10%] left-[5%] w-80 h-80 bg-gradient-to-br from-accent via-accent-light to-secondary rounded-full filter blur-3xl opacity-80 animate-blob" />
        <div className="absolute top-[30%] right-[5%] w-80 h-80 bg-gradient-to-br from-white via-secondary-light to-secondary rounded-full filter blur-3xl opacity-80 animate-blob animation-delay-2000" />
        <div className="absolute top-[30%] right-[40%] w-80 h-80 bg-gradient-to-br from-accent via-accent-light to-secondary rounded-full filter blur-3xl opacity-80 animate-blob" />
        <div className="absolute top-[50%] left-[10%] w-80 h-80 bg-gradient-to-br from-white via-secondary-light to-secondary rounded-full filter blur-3xl opacity-80 animate-blob animation-delay-2000" />

        {/* Hero Content */}
        <div className="hero-content text-center text-white relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-extrabold text-accent">CRYPTOPOLY</h1>
            <h2 className="text-5xl font-extrabold text-secondary-light mt-4">
              Step into the Future of Decentralized Finance
            </h2>
            <p className="py-6 text-lg font-medium">
              Embrace the Web3 revolution with secure, fast, and decentralized
              tools. Your assets, your control.
            </p>
            <Link
              to={"/market"}
              className="btn btn-accent transition-transform duration-300 hover:scale-110"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-20 bg-background-light">
        <div className="container mx-auto my-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-extrabold text-accent">
                What is Cryptopoly?
              </h2>
              <p className="text-lg text-secondary-light mt-4">
                Cryptopoly is a decentralized finance platform that empowers you
                to take control of your assets. With Cryptopoly, you can trade
                assets, lend, borrow, and earn interest in a secure and
                decentralized environment.
              </p>
            </div>
            <div className="diff aspect-[16/9]">
              <div className="diff-item-1">
                <img
                  src="https://start-in-blockchain.fr/wp-content/uploads/2022/10/Visuels-articles-min-7.png"
                  alt="Ethrereum"
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="diff-item-2">
                <img
                  src="https://g.foolcdn.com/editorial/images/804464/a-gold-coin-with-the-bitcoin-symbol-on-its-face.jpg"
                  alt="Bitcoin"
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="diff-resizer"></div>
            </div>
          </div>
        </div>

        {/* How to use ? */}
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-10 aspect-[16/9]">
          <img
            src="https://images.unsplash.com/photo-1614787296891-d1b2b1aced36?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Cryptocurrency"
            className="card rounded-lg shadow-lg w-3/4 "
          />
          <div>
            <h2 className="text-4xl font-extrabold text-accent">
              How to use Cryptopoly?
            </h2>
            <p className="text-lg text-secondary-light mt-4">
              Getting started with Cryptopoly is easy! Just follow these steps:
            </p>
            <div className="mt-6 space-y-6">
              {howUseData.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-accent text-white rounded-full font-bold shadow-lg">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-accent">
                      {item.title}
                    </h3>
                    <p className="text-secondary-light mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-lg text-secondary-light mt-8">
              With these steps, you can unleash the full potential of Cryptopoly
              and take control of your digital assets in a decentralized
              environment.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-10 bg-background-light">
        <h2 className="text-center text-3xl font-extrabold text-accent mb-10">
          What Makes Cryptopoly Unique?
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="relative group w-96">
            <div className="absolute inset-0 bg-gradient-to-r from-white to-accent rounded-lg blur opacity-75 group-hover:opacity-100 transition-all duration-1000 group-hover:duration-200 animate-tilt" />
            <div className="card bg-background-dark text-white shadow-lg transition-all duration-300">
              <div className="card-body">
                <h2 className="card-title text-accent">Decentralized</h2>
                <p>
                  Your assets are under your control. No middlemen, no banks,
                  just peer-to-peer.
                </p>
              </div>
            </div>
          </div>

          <div className="relative group w-96">
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent rounded-lg blur opacity-75 group-hover:opacity-100 transition-all duration-1000 group-hover:duration-200 animate-tilt" />
            <div className="card bg-background-dark text-white shadow-lg transition-all duration-300">
              <div className="card-body">
                <h2 className="card-title text-accent">Secure</h2>
                <p>
                  State-of-the-art cryptography ensures your transactions are
                  safe and verified.
                </p>
              </div>
            </div>
          </div>

          <div className="relative group w-96">
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-white rounded-lg blur opacity-75 group-hover:opacity-100 transition-all duration-1000 group-hover:duration-200 animate-tilt" />
            <div className="card bg-background-dark text-white shadow-lg transition-all duration-300">
              <div className="card-body">
                <h2 className="card-title text-accent">Fast Transactions</h2>
                <p>
                  Experience lightning-fast transactions with low fees across
                  decentralized networks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-background-light">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-accent mb-4">
            Join the Cryptopoly Revolution
          </h2>
          <p className="text-lg mb-6">
            Get early access to the Web3Flow ecosystem and unlock decentralized
            power today!
          </p>
          <button className="btn btn-accent transition-all duration-300 hover:scale-105">
            Sign Up Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
