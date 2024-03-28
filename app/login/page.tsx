import { FaGithub } from "react-icons/fa";


function Login() {
    // const providers = await getProviders().then((res: any) => {
    //   // console.log(res, "<<<<< : provider response");
    //   // console.log(res?.github.name);
    //   return res;
    // });

    return (
        <div className="flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        アカウントにログイン
                    </h2>
                </div>
                <div className="mt-8 space-y-6">
                    <div className="flex justify-center text-center">
                        <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex items-center">
                            <FaGithub className="mr-2" />
                            Githubでログイン
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;