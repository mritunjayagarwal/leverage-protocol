import React from 'react';
import '../../style.css';
import { Link } from 'react-router-dom';
import features from './features';
import ecosystem from './ecosystem';
import socials from './socials';

const Home = () => {
    return (
        <>
            <header className="hero-section">
                <nav className="navbar navbar-expand-lg py-3 m-0" style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
                    <div className='container container-fluid'>
                        <Link className="navbar-brand me-2" to="#">
                            <img src="./img/logo.png" style={{ width: "30px", height: "auto", "margin-top": "-10px" }} alt="" /> Leverage Protocol
                        </Link>

                        <button className="navbar-toggler text-white" type="button" data-toggle="collapse" data-target="#navbarText"
                            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="fa fa-bars"></i>
                        </button>

                        <div className="collapse navbar-collapse text-white" id="navbarText">
                            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a href="#ecosystem" className="px-3 pt-2 btn-link">
                                        Ecosystem
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#roadmap" className="px-3 pt-2 btn-link">
                                        Buy Now
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#privacy" className="px-3 pt-2 btn-link">
                                        Community
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <Link to="/swap">
                                        <button type="button" className="px-3 btn pt-2 px-5 nav-btn">
                                            Swap
                                        </button>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <section>
                    <div class="text-center">
                        <h1 class="hero-main" data-aos="fade" data-aos-duration="1000" data-aos-delay="400">Leverage Your Potential</h1>
                        <p class="hero-para mx-auto">a decentralized exchange platform that enables users to trade leading
                            cryptocurrencies with high leverage directly from their wallets.
                        </p>

                        <div class="d-flex justify-content-center">
                            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800">
                                <button class="btn-grad">Buy Now</button>
                            </div>
                            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="1000">
                                <Link class="hero-link"
                                    to="#"
                                    style={{ color: "#000" }}>
                                    <button class="hero-btn">Documentation</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </header>

            <main>
                <section>
                    <div className='container'>
                        <div>
                            <h1 className='hero-tag'>Take Your Trades to New
                                Elevations</h1>
                            <p>Leverage Protocol is a decentralized perpetual futures exchange on the blockchain that offers
                                deep liquidity and is readily composable for builders to integrate and customize.</p>
                        </div>
                        <div className='row'>
                            {features.map((feature) => {
                                return <div key={feature.id} className='col-lg-6 mt-4'>
                                    <img src={feature.icon} style={{ width: "50px", height: "auto" }} alt={feature.title} />
                                    <h1>{feature.title}</h1>
                                    <p>{feature.desc}</p>
                                </div>
                            })}
                        </div>
                    </div>
                </section>

                <section>
                    <div className='container container-fluid'>
                        <div>
                            <h1 className='hero-tag text-center'>A robust ecosystem</h1>
                            <p className='text-center'>Leverage Protocols Perp DEX is designed to deliver not only high leverage and lower fees, but
                                also trading speeds that are up to 10x faster than other platforms.</p>
                        </div>
                        <div className='row mt-5'>
                            {ecosystem.map((item) => {
                                return <div className='col-lg-4 d-flex justify-content-center'>
                                    <div className='ecosystem-item'>
                                        <h1 className='ecosystem-times'>{item.times}</h1>
                                        <h1 className='ecosystem-title'>{item.title}</h1>
                                        <p className='ecosystem-desc'>{item.desc}</p>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </section>
                <section>
                    <div className='container container-fluid'>
                        <div className='row'>
                            <div className='col-lg-7'>

                            </div>
                            <div className='col-lg-5 text-center d-flex align-items-center justify-content-center'>
                                <div>
                                    <h1 class="hero-tag">Trade on the Go</h1>
                                    <p>Trade freely from anywhere worldwide, with no
                                        geographical limitations to confide</p>
                                    <button className='btn-grad'>Launch Dapp</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className='container'>
                        <div>
                            <h1 className = "text-center">Join the Community</h1>
                            <p className = "text-center">The Leverage Protocol is a community-driven project, and we invite you to join us in building a
                                more equitable financial system</p>
                        </div>
                        <div className = "mt-5">
                            <div className='d-flex justify-content-around pb-5 socials-wrapper'>
                                { socials.map((social) => {
                                    return <div key = {social.id}>
                                        <Link to="/swap">
                                        <img src={social.icon} alt="" style = {{ width: "50px", height: 'auto', "border-radius": '50%'}} />
                                        </Link>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Home