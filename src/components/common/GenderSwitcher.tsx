import { useState } from "react";
import useUserStore from "../../store/store";

const GenderSwitcher = () => {
  const user = useUserStore((state) => state.user);
  const isEditingGender = useUserStore((state) => state.isEditingGender);
  const setIsEditingGender = useUserStore((state) => state.setIsEditingGender);
  const updateGender = useUserStore((state) => state.updateGender);

  const [selectedGender, setSelectedGender] = useState<"male" | "female">(
    user?.gender || "male"
  );

  const handleEditClick = async () => {
    if (isEditingGender) {
      await updateGender(selectedGender);
    }
    setIsEditingGender(!isEditingGender);
  };

  if (!user) return null;

  return (
    <div className="flex items-center space-x-2">
      {isEditingGender ? (
        <select
          value={selectedGender}
          onChange={(e) =>
            setSelectedGender(e.target.value as "male" | "female")
          }
          className="border rounded p-1"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      ) : (
        <span>{user.gender === "male" ? "Male" : "Female"}</span>
      )}
      <button onClick={handleEditClick} className="p-1">
        ✏️
      </button>
    </div>
  );
};

export default GenderSwitcher;
