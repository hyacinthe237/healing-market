<template lang="html">
    <div>
        <Navbar></Navbar>
        <section class="section-home">
            <div class="container">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="title"><span>All in one</span> solution to <br> track
                            and manage <br> your <span>security</span> <br> services</div>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>

                        <form action="#" class="_form mt-20">
                            <div class="form-group mt-20">
                                <div class="content bs">
                                    <input type="email"
                                        name="email"
                                        placeholder="Email address"
                                        class="form-control form-control-lg dark no-white"
                                    >
                                    <button @click="n('signup-welcome')">Start free trial version</button>
                                </div>
                                <div class="text-center button mt-20">
                                    <button class="btn btn-block btn-primary" @click="n('signup-welcome')">Start free trial version</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="col-sm-6">
                        <div class="img-hero">
                            <img :src="logoHeaderSection" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section-home">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12 text-center">
                        <div class="title">Discover our <br><span>products</span></div>
                    </div>
                    <div class="spacer"></div>
                    <div class="spacer"></div>
                    <div class="col-sm-6">
                        <div class="sub-title">Employee geotracking</div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Rerum esse impedit facere eos consectetur, ipsa ducimus quos eius reiciendis voluptatibus
                            dolores ut quisquam maiores accusantium.
                            Temporibus sunt nesciunt similique quidem.</p>
                        <a href="#">Learn more about employee tracking</a>
                    </div>
                    <div class="col-sm-6">
                        <div class="img">
                            <img :src="logoGeotracking" alt="">
                        </div>
                    </div>
                    <div class="spacer"></div>
                    <div class="col-sm-6">
                        <div class="img mg">
                            <img :src="logoManagement" alt="">
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="sub-title">Property management</div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Rerum esse impedit facere eos consectetur, ipsa ducimus quos eius reiciendis voluptatibus
                            dolores ut quisquam maiores accusantium.
                            Temporibus sunt nesciunt similique quidem.</p>
                        <a href="#">Learn more about property management</a>
                    </div>
                    <div class="spacer"></div>
                    <div class="col-sm-6">
                        <div class="sub-title">Scheduling</div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Rerum esse impedit facere eos consectetur, ipsa ducimus quos eius reiciendis voluptatibus
                            dolores ut quisquam maiores accusantium.
                            Temporibus sunt nesciunt similique quidem.</p>
                        <a href="#">Learn more about scheduling</a>
                    </div>
                    <div class="col-sm-6">
                        <div class="img">
                            <img :src="logoScheduling" alt="">
                        </div>
                    </div>
                    <div class="spacer"></div>
                    <div class="col-sm-6">
                        <div class="img">
                            <img :src="logoClocking" alt="">
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="sub-title">Time clocking</div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Rerum esse impedit facere eos consectetur, ipsa ducimus quos eius reiciendis voluptatibus
                            dolores ut quisquam maiores accusantium.
                            Temporibus sunt nesciunt similique quidem.</p>
                        <a href="#">Learn more about time clocking</a>
                    </div>
                </div>
            </div>
        </section>

        <div class="spacer-big"></div>

        <section class="section-home bg-red">
            <div class="container">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="_title"><span>10000+</span>trust and user our product daily</div>
                    </div>
                    <div class="col-sm-6">
                        <div class="img">
                            <img :src="logoPartners" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section-home">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12 text-center">
                        <div class="title">What makes our <br>product <span>stand out?</span></div>
                    </div>
                    <div class="spacer"></div>
                    <div class="col-sm-6">
                        <div class="blocks">
                            <div class="number">1</div>
                            <div class="block">
                                <div class="block-title bold">Cost-efficient</div>
                                <div class="desc">Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                    Reiciendis porro magni facere</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="blocks">
                            <div class="number">2</div>
                            <div class="block">
                                <div class="block-title bold">Simple and intuitive usage</div>
                                <div class="desc">Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                    Reiciendis porro magni facere</div>
                            </div>
                        </div>
                    </div>
                    <div class="spacer"></div>
                    <div class="col-sm-6">
                        <div class="blocks">
                            <div class="number">3</div>
                            <div class="block">
                                <div class="block-title bold">Every product you need to run your security company</div>
                                <div class="desc">Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                    Reiciendis porro magni facere</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="blocks">
                            <div class="number">4</div>
                            <div class="block">
                                <div class="block-title bold">100% satisfaction guaranteed</div>
                                <div class="desc">Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                    Reiciendis porro magni facere</div>
                            </div>
                        </div>
                    </div>
                    <div class="spacer"></div>
                    <div class="col-sm-12 text-center">
                        <i>It takes just a minute</i>
                        <button class="btn btn-primary" @click="n('signup-welcome')">Sign up now</button>
                    </div>
                </div>
            </div>
        </section>

        <section class="section-home">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12 text-center">
                        <div class="title">Testimonials</div>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    <div class="col-sm-12">
                        <div id="myCarousel" class="carousel slide" data-ride="carousel">
                            <!-- Carousel indicators -->
                            <ol class="carousel-indicators">
                                <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                                <li data-target="#myCarousel" data-slide-to="1"></li>
                                <li data-target="#myCarousel" data-slide-to="2"></li>
                            </ol>
                            <!-- Wrapper for carousel items -->
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="testimonial-wrapper">
                                                <div class="testimonial">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sem tempor, varius quam at, luctus dui.</div>
                                                <div class="media">
                                                    <div class="media-body">
                                                        <div class="overview">
                                                            <div class="rond"></div>
                                                            <div class="name">Paula Wilson</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="testimonial-wrapper">
                                                <div class="testimonial">Vestibulum quis quam ut magna consequat faucibus. Pellentesque eget mi suscipit tincidunt.</div>
                                                <div class="media">
                                                    <div class="media-body">
                                                        <div class="overview">
                                                            <div class="rond"></div>
                                                            <div class="name">Antonio Moreno</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="carousel-item">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="testimonial-wrapper">
                                                <div class="testimonial">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sem tempor, varius quam at, luctus dui.</div>
                                                <div class="media">
                                                    <div class="media-body">
                                                        <div class="overview">
                                                            <div class="rond"></div>
                                                            <div class="name">Paula Wilson</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="testimonial-wrapper">
                                                <div class="testimonial">Vestibulum quis quam ut magna consequat faucibus. Pellentesque eget mi suscipit tincidunt.</div>
                                                <div class="media">
                                                    <div class="media-body">
                                                        <div class="overview">
                                                            <div class="rond"></div>
                                                            <div class="name">Antonio Moreno</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="carousel-item">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="testimonial-wrapper">
                                                <div class="testimonial">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sem tempor, varius quam at, luctus dui.</div>
                                                <div class="media">
                                                    <div class="media-body">
                                                        <div class="overview">
                                                            <div class="rond"></div>
                                                            <div class="name">Paula Wilson</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="testimonial-wrapper">
                                                <div class="testimonial">Vestibulum quis quam ut magna consequat faucibus. Pellentesque eget mi suscipit tincidunt.</div>
                                                <div class="media">
                                                    <div class="media-body">
                                                        <div class="overview">
                                                            <div class="rond"></div>
                                                            <div class="name">Antonio Moreno</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section-home bg-grey mt-20">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12 text-center">
                        <div class="title">Download App</div>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>

                        <div class="buttons">
                            <button class="app-store">
                                <img :src="logoApple" alt="">
                                <span>Download on the <br> App Store</span>
                            </button>
                            <button class="play-store">
                                <img :src="logoGoogle" alt="">
                                <span>Get it on <br> Google Play</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <Footer></Footer>
    </div>
</template>

<script>
import logoHeaderSection from '@/assets/img/landing/header-section.png'
import logoManagement from '@/assets/img/landing/management.png'
import logoGeotracking from '@/assets/img/landing/geotracking.png'
import logoScheduling from '@/assets/img/landing/scheduling.png'
import logoClocking from '@/assets/img/landing/clocking.png'
import logoParners from '@/assets/img/landing/partners.jpg'
import logoGoogle from '@/assets/img/landing/google.png'
import logoApple from '@/assets/img/landing/apple.png'
import Navbar from '@/components/commons/frontend/header/nav'
import Footer from '@/components/commons/frontend/footer/footer'

export default {
    name: 'LandingPage',

    data: () => ({
        logoParners, logoApple, logoGoogle, logoHeaderSection, logoManagement, logoGeotracking, logoScheduling, logoClocking
    }),

    components: {
        Navbar, Footer
    }
}
</script>
