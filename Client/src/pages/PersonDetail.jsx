import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CastDetails, posterPath } from "./../api/apiCall";
import axios from "axios";
import PersonMediaGrid from "../components/PersonMediaGrid";

const PersonDetail = () => {
  const { id } = useParams();
  const [person, setPerson] = useState([]);
  const getPersonDetail = async () => {
    try {
      const res = await axios.get(CastDetails(id));
      if (res.data) setPerson(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getPersonDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      {person && (
        <>
          <div className="screen-max-width mt-4">
            <div className="relative flex flex-col md:flex-row">
              <div className="w-full md:w-1/5">
                <div
                  className="w-full"
                  style={{
                    paddingTop: "160%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "darkgrey",
                    backgroundImage: `url(${posterPath(person.profile_path)})`,
                  }}
                />
              </div>
              <div className="w-full md:w-4/5 px-4 md:px-8 py-4 md:py-0">
                <div className="space-y-2">
                  <h5 className="font-bold">
                    {`${person.name} (${
                      person.birthday && person.birthday.split("-")[0]
                    }`}
                    {person.deathday &&
                      ` - ${person.deathday && person.deathday.split("-")[0]}`}
                    {")"}
                  </h5>
                  <p className="text-sm">{person.biography}</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-3xl mb-3">Phim</h3>
              <PersonMediaGrid personId={id} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PersonDetail;
