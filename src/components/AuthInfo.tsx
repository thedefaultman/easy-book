import useUserInfo from "@/hooks/useUserInfo";

const AuthInfo = () => {
  const {
    firstName,
    lastName,
    DOB,
    gender,
    setFirstName,
    setLastName,
    setDOB,
    setGender,
  } = useUserInfo();
  return (
    <>
      <div className="flex flex-col">
        <label htmlFor="firstName">Name</label>
        <div className="flex justify-between items-center gap-x-3">
          <input
            name="first"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="bg-neutral-200 px-2 py-1 rounded-sm w-full"
            required
          />

          <input
            name="last"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="bg-neutral-200 px-2 py-1 rounded-sm w-full"
            required
          />
        </div>
      </div>
      <div className="flex justify-start items-center gap-x-2 mt-2">
        <label htmlFor="DOB" className="w-1/3">
          Date of birth
        </label>
        <input
          type="date"
          name="DOB"
          className="bg-neutral-200 px-2 py-1 rounded-sm w-full text-[#A7AdB6]"
          value={DOB.toISOString().split("T")[0]}
          onChange={(e) => setDOB(new Date(e.target.value))}
          required
        />
      </div>
      <div className="flex mt-2">
        <label htmlFor="gender" className="w-full">
          Gender
        </label>
        <div className="flex justify-between items-center gap-x-3">
          <input
            type="radio"
            id="gender"
            name="gender"
            value={gender}
            onChange={() => setGender("male")}
            checked
          />
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            id="gender"
            name="gender"
            value={gender}
            onChange={() => setGender("female")}
          />
          <label htmlFor="female">Female</label>
          <input
            type="radio"
            id="gender"
            name="gender"
            value={gender}
            onChange={() => setGender("other")}
          />
          <label htmlFor="other">Other</label>
        </div>
      </div>
    </>
  );
};

export default AuthInfo;
