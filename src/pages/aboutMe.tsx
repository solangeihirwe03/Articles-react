import { FaGithub, FaLinkedin, FaCode } from 'react-icons/fa';
import Container from '../components/styleComponent';

const AboutMe = () => {
    return (
        <Container>
            <div className="flex justify-center my-8"> {/* Centering container */}
                <aside className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500 w-full max-w-[70%] shadow-xl"> {/* 70% width */}
                    <div className="flex items-start space-x-4">
                        {/* Author avatar placeholder */}
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
                                <span className="text-xl">SD</span>
                            </div>
                        </div>

                        <div className="flex-1"> {/* Takes remaining space */}
                            <h3 className="text-xl font-bold text-gray-800">Solange Duhimbaze Iihrwe</h3>
                            <p className="text-gray-600 mb-3">
                                Full-Stack Developer | Technical Writer | Open-Source Contributor
                            </p>

                            <div className="prose prose-sm text-gray-700">
                                <p>
                                    Combines hands-on experience from <strong>SheCanCode</strong> and <strong>Andela</strong> programs
                                    with freelance projects to deliver practical insights about web development.
                                </p>
                            </div>

                            <div className="flex space-x-4 mt-4">
                                <a
                                    href="https://github.com/solangelhirwe03"
                                    target="_blank"
                                    className="text-gray-700 hover:text-black transition-colors"
                                    aria-label="GitHub"
                                >
                                    <FaGithub className="text-xl" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/solangelhirwe/"
                                    target="_blank"
                                    className="text-blue-600 hover:text-blue-800 transition-colors"
                                    aria-label="LinkedIn"
                                >
                                    <FaLinkedin className="text-xl" />
                                </a>
                                <a
                                    href="https://bytequeen-portifolio.onrender.com/"
                                    className="text-gray-700 hover:text-blue-600 transition-colors flex items-center"
                                >
                                    <FaCode className="mr-1" /> My Work
                                </a>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </Container>
    );
};

export default AboutMe;