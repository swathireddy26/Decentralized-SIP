import { ethers } from "ethers";
import { useState } from "react";

import Uni from "./Uni.json";
import Erc from "./Erc20.json";
import Keeper from "./Keeper.json";
import "./App.css";

function App() {
  const [balance, setBalance] = useState(0);
  const [connectedAddress, setConnectedAddress] = useState(0);
  const [invested, setInvested] = useState(0);
  const wethAddress = "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa";
  const wmaticAddress = "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889";

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    setConnectedAddress(addr);
    const balance = await provider.getBalance(addr);
    setBalance(ethers.utils.formatEther(balance.toString()));
    const contract = new ethers.Contract(wmaticAddress, Erc.abi, signer);
    const invested = await contract.balanceOf(addr);
    setInvested(ethers.utils.formatEther(invested.toString()));
  }

  async function approve() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(wethAddress, Erc.abi, signer);
      try {
        const addr = await signer.getAddress();
        const b = await contract.balanceOf(addr);
        console.log(b.toString());
        await contract.approve(Uni.address, 10000000000000);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  async function swap() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(Uni.address, Uni.abi, signer);
      try {
        const amount = await contract.swapExactInputSingle(1000000000000);
        console.log(amount);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  async function register() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(Keeper.address, Keeper.abi, signer);
      try {
        await contract.register(1000000000000);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  return (
    <div class="relative bg-white overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>
          <div>
            <div class="relative pt-6 px-4 sm:px-6 lg:px-8">
              <nav
                class="relative flex items-center justify-between sm:h-10 lg:justify-start"
                aria-label="Global"
              >
                <div class="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                  <div class="flex items-center justify-between w-full ">
                    <a href="#">
                      <span class="sr-only">Workflow</span>
                      <img
                        class="h-8 w-auto sm:h-10"
                        src="https://i.ibb.co/xzp4Z5b/Cont-logo.png"
                      />
                    </a>
                  </div>
                </div>
                <div class="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                  <a href="#" class="text-2xl text-indigo-600">
                    Continuum
                  </a>
                  <a
                    href="#"
                    class="font-medium text-gray-500 hover:text-gray-900"
                  >
                    {balance.substr(0, 7)}MATIC
                  </a>
                  <a
                    href="#"
                    class="font-medium text-gray-500 hover:text-gray-900"
                  >
                    {connectedAddress.substr(0, 5)}...
                    {connectedAddress.substr(38, 5)}
                  </a>
                </div>
              </nav>
            </div>
          </div>
          <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div class="sm:text-center lg:text-left">
              <div class="bg-indigo-400 border-indigo-600 border-b p-2 rounded">
                Portfolio: {invested}
              </div>
              <br />
              <button
                className="
                bg-violet-500
                rounded-md
                p-2
                inline-flex
                items-center
                justify-center
                text-white
                hover:bg-violet-400
                active:bg-violet-600
                focus:outline-none
                focus:ring
                focus:ring-violet-300
                aria-expanded=false"
                onClick={requestAccount}
              >
                Refresh balance
              </button>
              <br />
              <br />
              <button
                className="
                bg-violet-500
                rounded-md
                p-2
                inline-flex
                items-center
                justify-center
                text-white
                hover:bg-violet-400
                active:bg-violet-600
                focus:outline-none
                focus:ring
                focus:ring-violet-300
                aria-expanded=false"
                onClick={approve}
              >
                Approve
              </button>
              <br />
              <br />
              <button
                className="
                bg-violet-500
                rounded-md
                p-2
                inline-flex
                items-center
                justify-center
                text-white
                hover:bg-violet-400
                active:bg-violet-600
                focus:outline-none
                focus:ring
                focus:ring-violet-300
                aria-expanded=false"
                onClick={register}
              >
                Register
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
