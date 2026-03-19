import axios from "axios";
import { useAuth } from "@clerk/react";
import react, { useState } from "react";

interface HomeProps {
  onLogin: () => void;
  onSignup: () => void;
}

export default function Home({ onLogin, onSignup }: HomeProps) {
       const [projectId, setProjectId] = useState("");
       const [gitUrl, setGitUrl] = useState("");
       const [description, setDescription] = useState("");

      const { isLoaded, isSignedIn } = useAuth();

       const handleSubmit = async (e: react.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:9000/build", {
                projectId,
                gitUrl,
                description,
            });
            console.log("Deployment initiated:", response.data);
        } catch (error) {
            console.error("Error initiating deployment:", error);
        }
         };
    
    return (
        <>
            <style>{`
                @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
            
                * {
                    font-family: "Poppins", sans-serif;
                }
            `}</style>
            <section className='relative bg-black flex flex-col md:flex-row justify-center px-4 py-20 gap-20'>
                
                <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none mb-10 size-140 bg-green-500/35 rounded-full blur-[200px]'></div>
                
                <div className='text-center md:text-left mt-12'>
                    <div className="flex items-center  p-1.5 rounded-full border border-green-900 text-xs w-fit mx-auto md:mx-0">
                        <div className="flex items-center">
                            <img className="size-7 rounded-full border border-green-900" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50" alt="userImage1" />
                            <img className="size-7 rounded-full border border-green-900 -translate-x-2" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50" alt="userImage2" />
                            <img className="size-7 rounded-full border border-green-900 -translate-x-4" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50&h=50&auto=format&fit=crop" alt="userImage3" />
                        </div>
                        <p className="-translate-x-2 text-xs text-slate-200">Join our community of Deployment </p>
                    </div>
                    <h1 className='font-medium text-3xl md:text-5xl/15 bg-linear-to-r max-md:mx-auto from-white to-green-300 bg-clip-text text-transparent max-w-[470px] mt-4'>Ready to Deploy Your Website?</h1>
                    <p className='text-sm/6 text-white max-w-[345px] mt-4 mx-auto md:mx-0'>Get started with our easy-to-use deployment platform and launch your website in minutes by providing your GitHub repository URL.</p> 

                </div>
                        
                <div className='w-full max-w-lg max-md:mx-auto bg-[#00A63E]/0 backdrop-blur-sm border border-white/10 rounded-xl p-8'>
                    {isLoaded && isSignedIn ? (
                      <form className="space-y-6">
                        <div>
                          <label className="block text-white text-sm mb-2">
                            Project Name
                          </label>
                          <input
                            type="text"
                            required
                            value={projectId}
                            onChange={(e) => setProjectId(e.target.value)}
                            placeholder="Eden Johnson"
                            className="w-full bg-[#00A63E]/5 border border-white/20 rounded-lg px-4 py-3 text-white/40 placeholder:text-white/40 placeholder:text-sm focus:outline-none focus:border-green-600 transition"
                          />
                        </div>

                        <div>
                          <label className="block text-white text-sm mb-2">
                            GitHub URL
                          </label>
                          <input
                            type="url"
                            required
                            value={gitUrl}
                            onChange={(e) => setGitUrl(e.target.value)}
                            placeholder="https://github.com/username/repository"
                            className="w-full bg-[#00A63E]/5 border border-white/20 rounded-lg px-4 py-3 text-white/40 placeholder:text-white/40 placeholder:text-sm focus:outline-none focus:border-green-600 transition"
                          />
                        </div>

                        <div>
                          <label className="block text-white text-sm mb-2">
                            Describe Your Project
                          </label>
                          <textarea
                            placeholder="Briefly describe your project..."
                            rows={4}
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-[#00A63E]/5 border border-white/20 rounded-lg px-4 py-3 text-white/40 placeholder:text-white/40 placeholder:text-sm focus:outline-none focus:border-green-600 transition resize-none"
                          ></textarea>
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="text-xs md:text-sm text-white/60 max-w-3xs">
                            By submitting, you agree to our{" "}
                            <span className="text-white">Terms</span> and{" "}
                            <span className="text-white">Privacy Policy</span>.
                          </p>
                          <button
                            onClick={handleSubmit}
                            type="submit"
                            className="bg-linear-to-r from-green-950 to-green-600 hover:from-green-600 hover:to-green-950 text-white text-sm px-8 md:px-16 py-3 rounded-full transition duration-300 cursor-pointer"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-3 text-center">
                        <p className="text-sm text-white/70">
                          Sign in to deploy your GitHub project.
                        </p>
                        <p className="text-xs text-white/50">
                          Once authenticated, the GitHub URL form will appear automatically.
                        </p>
                        <div className="pt-2 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                          <button
                            type="button"
                            onClick={onLogin}
                            className="w-full sm:w-auto rounded-full border border-white/15 bg-white/5 px-8 py-2.5 text-sm text-white/80 transition duration-300 hover:border-green-500/60 hover:bg-white/10 hover:text-white"
                          >
                            Login
                          </button>
                          <button
                            type="button"
                            onClick={onSignup}
                            className="w-full sm:w-auto rounded-full bg-linear-to-r from-green-950 to-green-600 px-8 py-2.5 text-sm text-white transition duration-300 hover:from-green-600 hover:to-green-950"
                          >
                            Sign up
                          </button>
                        </div>
                      </div>
                    )}
                </div>
            </section>
        </>
    );
};