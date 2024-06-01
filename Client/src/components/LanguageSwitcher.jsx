import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, Button } from "flowbite-react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
  };

  const languages = {
    en: { label: "US" },
    vi: { label: "VI" },
  };

  return (
    <Button pill className="w-18 h-10 hidden sm:inline" color="gray">
      <Dropdown
        label={
          <span className="flex items-center justify-between">
            <span className="mr-2">🌍</span> {/* Earth icon */}
            {languages[currentLanguage].label}
          </span>
        }
        inline
      >
        <Dropdown.Item
          className="flex items-center hover:bg-gray-200 focus:bg-gray-200 transition duration-200"
          onClick={() => changeLanguage("en")}
        >
          US
        </Dropdown.Item>
        <Dropdown.Item
          className="flex items-center hover:bg-gray-200 focus:bg-gray-200 transition duration-200"
          onClick={() => changeLanguage("vi")}
        >
          VI
        </Dropdown.Item>
      </Dropdown>
    </Button>
  );
};

export default LanguageSwitcher;
