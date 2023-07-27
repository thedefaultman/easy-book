import useUserInfo from "@/hooks/useUserInfo";
import AllergyDropdown from "./AllergyDropdown";
import MedicationDropdown from "./MedicationDropdown";

const PatientAuth = () => {
  const { address, setAddress, phone, setPhone } = useUserInfo();
  return (
    <div className="flex flex-col justify-between items-center">
      <div className="flex flex-col justify-start items-start w-full gap-x-3 mt-2">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          placeholder="Please Enter your full address"
          className="bg-neutral-200 px-2 py-1 rounded-sm w-full"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="flex flex-col justify-start items-start w-full gap-x-3 mt-2">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          maxLength={10}
          className="bg-neutral-200 px-2 py-1 rounded-sm w-full"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <AllergyDropdown />
      <MedicationDropdown />
    </div>
  );
};

export default PatientAuth;
