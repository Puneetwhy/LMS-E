import HomeLayout from "../layouts/HomeLayout";
import AboutImage from "../assets/images/AboutImage.png"
import Admin_Profile from "../assets/images/Admin_Profile.png"
import boy_profile1 from "../assets/images/boy_profile1.png"
import boy_profile2 from "../assets/images/boy_profile2.png"
import girl_profile1 from "../assets/images/girl_profile1.png"
import girl_profile2 from "../assets/images/girl_profile2.png"

const AboutUs = () => {
    return(
        <>
            <HomeLayout>
                <div className="px-5 sm:px-10 lg:px-20 pt-10 lg:pt-20 min-h-[90vh] flex flex-col text-white">
                    <div className="flex flex-col lg:flex-row items-center gap-10 mx-5 lg:mx-10">
                        <section className="w-full lg:w-1/2 space-y-6 lg:space-y-10 text-center lg:text-left">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-yellow-500 font-semibold">
                                Affordable and quality <br /> Education
                            </h1>

                            <p className="text-base sm:text-lg lg:text-xl text-gray-200">
                                Our goal is to provide the affordable and quality education to the world. we are providing the plateform for the aspiring teacher and students to share their skills, creativity and knowledge to each other to empower and contribute in the growth and wellness of mankind. 
                            </p>
                        </section>

                        <div className="w-full lg:w-1/3 flex justify-center">
                            <img 
                            id="test1"
                            style={{
                                filter:"drop-shadow(0px 10px 10px rgb(0,0,0))"
                            }}
                            className="w-60 sm:w-72 lg:w-full drop-shadow-2xl"
                            src={AboutImage} 
                            alt="about main image" />
                        </div>
                    </div>

                <div className="carousel w-full my-16 mx-auto">
                    <div id="item1" className="carousel-item flex flex-col items-center justify-center  w-full">
                        <img
                        src={Admin_Profile}
                        className="w-32 h-32 sm:w-40 sm:h-40 rounded-full m-5"/>

                        <h1 className="text-2xl font-semibold m-2">Admin</h1>

                        <p className="text-gray-400 w-full sm:w-3/4 lg:w-1/2 text-center text-sm sm:text-base">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quod sequi ipsa nisi? Laborum eum maxime impedit dolore perspiciatis voluptatibus ad debitis blanditiis. Placeat sequi non nemo consectetur illum nisi magnam porro voluptates suscipit, voluptatem repellat quo! Asperiores, similique assumenda .
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, quo?
                        </p>
                    </div>
                    <div id="item2" className="carousel-item flex flex-col items-center justify-center w-full">
                        <img
                        src={boy_profile1}
                        className="w-32 h-32 sm:w-40 sm:h-40 rounded-full m-5"/>

                        <h1 className="text-2xl font-semibold m-2">Samraat</h1>

                        <p className="text-gray-400 w-full sm:w-3/4 lg:w-1/2 text-center text-sm sm:text-base">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quod sequi ipsa nisi? Laborum eum maxime impedit dolore perspiciatis voluptatibus ad debitis blanditiis. Placeat sequi non nemo consectetur illum nisi magnam porro voluptates suscipit, voluptatem repellat quo! Asperiores, similique assumenda .
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, quo?
                        </p>
                    </div>
                   
                    <div id="item4" className="carousel-item flex flex-col items-center justify-center w-full">
                        <img
                        src={girl_profile1}
                        className="w-32 h-32 sm:w-40 sm:h-40 rounded-full m-5"/>

                         <h1 className="text-2xl font-semibold m-2">Aishwarya</h1>

                        <p className="text-gray-400 w-full sm:w-3/4 lg:w-1/2 text-center text-sm sm:text-base">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quod sequi ipsa nisi? Laborum eum maxime impedit dolore perspiciatis voluptatibus ad debitis blanditiis. Placeat sequi non nemo consectetur illum nisi magnam porro voluptates suscipit, voluptatem repellat quo! Asperiores, similique assumenda .
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, quo?
                        </p>
                    </div>

                     <div id="item3" className="carousel-item flex flex-col items-center justify-center w-full">
                        <img
                        src={boy_profile2}
                        className="w-32 h-32 sm:w-40 sm:h-40 rounded-full m-5"/>

                        <h1 className="text-2xl font-semibold m-2">Puneet</h1>

                        <p className="text-gray-400 w-full sm:w-3/4 lg:w-1/2 text-center text-sm sm:text-base">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quod sequi ipsa nisi? Laborum eum maxime impedit dolore perspiciatis voluptatibus ad debitis blanditiis. Placeat sequi non nemo consectetur illum nisi magnam porro voluptates suscipit, voluptatem repellat quo! Asperiores, similique assumenda .
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, quo?
                        </p>
                    </div>

                    <div id="item5" className="carousel-item flex flex-col items-center justify-center w-full">
                        <img
                        src={girl_profile2}
                        className="w-32 h-32 sm:w-40 sm:h-40 rounded-full m-5"/>

                        <h1 className="text-2xl font-semibold m-2">Pratibha</h1>

                        <p className="text-gray-400 w-full sm:w-3/4 lg:w-1/2 text-center text-sm sm:text-base">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quod sequi ipsa nisi? Laborum eum maxime impedit dolore perspiciatis voluptatibus ad debitis blanditiis. Placeat sequi non nemo consectetur illum nisi magnam porro voluptates suscipit, voluptatem repellat quo! Asperiores, similique assumenda .
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, quo?
                        </p>
                    </div>
                </div>
                <div className="flex w-full justify-center mb-5 gap-2 py-2 flex-wrap">
                    <a href="#item1" className="btn btn-xs">1</a>
                    <a href="#item2" className="btn btn-xs">2</a>
                    <a href="#item3" className="btn btn-xs">3</a>
                    <a href="#item4" className="btn btn-xs">4</a>
                    <a href="#item5" className="btn btn-xs">5</a>
                </div>
                </div>
            </HomeLayout>
        </>
    )
}

export default AboutUs;