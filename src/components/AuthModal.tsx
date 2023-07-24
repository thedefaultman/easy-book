"use client";

import { useEffect, useState } from "react";
import {
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useAuthModal } from "@/hooks/useAuthModal";
import Modal from "./Modal";

const AuthModal = () => {
  const { close, isOpen } = useAuthModal();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { session } = useSessionContext();

  const [login, setLogin] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [patient, setPatient] = useState(true);
  const [doctor, setDoctor] = useState(false);
  const [user_id, setUser_id] = useState("");

  useEffect(() => {
    if (session) {
      router.refresh();
      close();
    }
  }, [close, router, session]);

  const handleLogin = async () => {
    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged in successfully!");
    }

    if (session) {
      router.push("/dashboard");
    }
  };

  const handleSignUp = async () => {
    const { data, error } = await supabaseClient.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          user_role: doctor ? "Doctor" : "Patient",
          user_id: user_id,
        },
      },
    });

    if (data) {
      toast.success("Account created successfully!");
    }

    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <Modal
      title={login ? "Login" : "Sign Up"}
      description=""
      isOpen={isOpen}
      onChange={() => {
        if (isOpen) close();
      }}
    >
      <div className={`flex flex-col ${login && "hidden"}`}>
        <label htmlFor="firstName">Name</label>
        <div className="flex justify-between items-center gap-x-3">
          <input
            name="first"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="bg-neutral-200 px-2 py-1 rounded-sm w-full"
          />

          <input
            name="last"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="bg-neutral-200 px-2 py-1 rounded-sm w-full"
          />
        </div>
      </div>

      <div className="flex flex-col mt-2">
        <label htmlFor="email">Email Address</label>
        <input
          name="email"
          type="email"
          placeholder="E-mail"
          className="bg-neutral-200 px-2 py-1 rounded-sm w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex flex-col mt-2">
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="bg-neutral-200 px-2 py-1 rounded-sm w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div
        className={`flex justify-start items-center gap-x-2 mt-2 ${
          login && "hidden"
        }`}
      >
        <input
          type="checkbox"
          name="doctor"
          checked={doctor}
          onChange={() => {
            setDoctor(!doctor);
            setPatient(false);
          }}
        />
        <label htmlFor="doctor">Doctor</label>
        <input
          type="checkbox"
          name="patient"
          checked={patient}
          onChange={() => {
            setPatient(!patient);
            setDoctor(false);
          }}
        />
        <label htmlFor="patient">Patient</label>
      </div>

      <div className={`flex flex-col mt-2 ${!patient && !doctor && "hidden"}`}>
        <label htmlFor="id">
          {"Please Enter Your 10-Digit "}
          {patient ? "Personal Health Number" : "Doctor's License"}
        </label>
        <input
          type="text"
          name="id"
          placeholder={patient ? "PHN" : "License"}
          className="bg-neutral-200 px-2 py-1 rounded-sm w-full"
          maxLength={10}
          value={user_id}
          onChange={(e) => setUser_id(e.target.value)}
        />
      </div>

      <div
        className={`flex justify-between items-center mt-2 ${
          !login && "hidden"
        }`}
      >
        <div className="flex gap-x-2">
          <input type="checkbox" name="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>

        <button className="text-blue text-sm">Forgot password</button>
      </div>

      <button
        className="bg-blue text-white px-2 py-1 rounded-sm border border-blue hover:bg-white hover:text-blue hover:border-blue w-full mt-4"
        onClick={() => {
          login ? handleLogin() : handleSignUp();
        }}
      >
        {login ? "Login" : "Sign Up"}
      </button>

      <div className="flex justify-center items-center mt-4">
        <p className="text-black">{"Don't have an account?"}</p>
        <button
          className="text-blue text-sm ml-2"
          onClick={() => {
            setLogin(!login);
            setUser_id("");
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setDoctor(false);
            setPatient(false);
          }}
        >
          {login ? "Sign Up" : "Login"}
        </button>
      </div>
    </Modal>
  );
};

export default AuthModal;
