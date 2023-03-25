import React, { Fragment, useState, useRef, useEffect } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { apiClinicUpdate } from "../../../api/api-clinic-edit";
import appSlice from "../../../store/app-slice";
import InputCheckText from "./input-check-text";
// call_number_way: "線上叫號";
// care_group: "";
// city: "台北市";
// clinic_status: "可電訪";
// district: "大安區";
// experience: "";
// his: "耀聖";
// id: "c1";
// isDecided: false;
// isUse_video: false;
// isVisit_datetime: "15:00~18:00";
// join_group: "慢性病$BC肝$慢性腎臟病$ABCD其他資訊";
// name: "cxxx診所";
// people: 3;
// phone: "0921231434";
// road: "瑞光路4段18號5-5";
const optionTrim = (option) => {
  let newOption = option.trim();
  return newOption;
};
const ClinicEditModal = (props) => {
  let { item } = props;
  // let {
  //   call_number_way,
  //   care_group,
  //   care_network,
  //   city,
  //   district,
  //   experience,
  //   his,
  //   id,
  //   isDecided,
  //   isUse_video,
  //   isVisit_datetime,
  //   name,
  //   people,
  //   phone,
  //   road,
  // } = item;

  const appSlice = useSelector((state) => state.appSlice);

  const [name, setName] = useState(item.name);
  const [phone, setPhone] = useState(item.phone);
  const [people, setPeople] = useState(item.people);
  const [road, setRoad] = useState(item.road);
  const [id, setId] = useState(item.id);
  const [his, setHis] = useState(item.his);
  const [district, setDistrict] = useState(item.district);
  const [experience, setExperience] = useState(item.experience);
  const [city, setCity] = useState(item.city);
  const [callNumberWay, setCallNumberWay] = useState(item.call_number_way);
  const [careGroup, setCareGroup] = useState(item.care_group);
  const [clinicStatus, setClinicStatus] = useState(item.clinic_status);
  const [careNetwork, setCareNetwork] = useState(
    item.care_network === ""
      ? []
      : item.care_network.split("$").map((item, index) => {
          return { text: item, id: index };
        })
  );
  const [isDecided, setIsDecided] = useState(item.isDecided);
  const [isUseVideo, setIsUseVideo] = useState(item.isUse_video);
  const [visitDatetime, setVisitDatetime] = useState(item.isVisit_datetime);

  const [apiUpdate, setApiUpdate] = useState(false);

  const careNetworkHandler = (data) => {
    let preString = data.previous;
    let nowString = data.now.replace("$", "");
    let arr = Array.from(careNetwork);
    let find = arr.find((item) => item.text == preString);
    find.text = nowString;
    setCareNetwork(arr);
  };

  const careNetwrokRemove = (value) => {
    let c = careNetwork.filter((item) => item.text !== value);
    setCareNetwork(c);
  };

  const careNetworkCreate = () => {
    let arr = Array.from(careNetwork);
    arr.push({ text: "", id: `k${Date.now()}` });
    setCareNetwork(arr);
  };

  useEffect(() => {
    if (apiUpdate) {
      const token = appSlice.userToken;
      var joinGroup = "";
      const careNetworkCount = careNetwork.length;
      careNetwork.forEach((item, index) => {
        joinGroup += item.text;
        if (index + 1 < careNetworkCount) {
          joinGroup += "$";
        }
      });

      console.log(joinGroup);
      apiClinicUpdate(
        token,
        id,
        name,
        phone,
        city,
        district,
        road,
        his,
        isUseVideo,
        isDecided,
        people,
        callNumberWay,
        visitDatetime,
        careGroup,
        experience,
        joinGroup.trim(),
        (err) => {
          alert(err);
        },
        () => {
          setApiUpdate(false);
          props.onRefresh();
        }
      );
    }
  }, [apiUpdate]);

  const apiUpdateHandler = () => {
    setApiUpdate(true);
  };

  useEffect(() => {
    console.log(careNetwork);
  }, [careNetwork]);

  return (
    <Fragment>
      <div className="basicInform">
        <section className=" pb-2 title">
          <div className="w-25 ">
            <label htmlFor="clinicName" className="form-label">
              診所名稱:
            </label>
            <input
              type="text"
              className="form-control"
              id="clinicName"
              placeholder=""
              defaultValue={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="w-25">
            <label htmlFor="clinicCode" className="form-label">
              機構代碼:
            </label>
            <input
              type="text"
              className="form-control"
              id="clinicCode"
              placeholder="3501183547"
              defaultValue={id}
              disabled
            />
          </div>
          <div className="w-25 ">
            <label htmlFor="clinicTelephone" className="form-label">
              電話:
            </label>
            <input
              type="tel"
              className="form-control"
              id="clinicTelephone"
              placeholder="02-2362-5100"
              defaultValue={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
        </section>
        <section className=" pb-3 border-bottom inform-address">
          <div className="w-25 d-flex">
            <div className="w-100 pe-2">
              <label htmlFor="city" className="form-label">
                城市:
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                placeholder="台北市"
                defaultValue={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </div>
            <div className="w-100 ">
              <label htmlFor="district" className="form-label">
                區域:
              </label>
              <input
                type="text"
                className="form-control"
                id="district"
                placeholder="內湖區"
                defaultValue={district}
                onChange={(e) => {
                  setDistrict(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="address ">
            <label htmlFor="address" className="form-label">
              地址:
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="汀州路二段212號"
              defaultValue={road}
              onChange={(e) => {
                setRoad(e.target.value);
              }}
            />
          </div>
        </section>
        <section className="inform-his pt-2">
          <div className="inform-his-item">
            <div className="w-100  ">
              <label htmlFor="HIS-system" className="form-label">
                HIS系統:
              </label>
              <select
                id="HIS-system"
                className="form-select"
                aria-label="Default select example"
                defaultValue={his}
                onChange={(e) => {
                  setHis(e.target.value);
                }}
              >
                <option value="">無使用</option>
                <option value="展望">展望</option>
                <option value="耀聖">耀聖</option>
                <option value="其他">其他</option>
              </select>
            </div>
            <div className="w-100 ">
              <label htmlFor="callMode" className="form-label">
                叫號方式:
              </label>
              <input
                type="email"
                className="form-control"
                id="callMode"
                placeholder=""
                defaultValue={callNumberWay}
                onChange={(e) => {
                  setCallNumberWay(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="inform-his-item">
            <div className="w-100">
              <label htmlFor="otherDoctor" className="form-label">
                其他醫院執業:
              </label>
              <input
                type="text"
                className="form-control"
                id="otherDoctor"
                placeholder="無"
                defaultValue={experience}
                onChange={(e) => {
                  setExperience(e.target.value);
                }}
              />
            </div>
            <div className="w-100">
              <label htmlFor="doctorNumber" className="form-label">
                醫生人數:
              </label>
              <input
                type="text"
                className="form-control"
                id="doctorNumber"
                placeholder="1"
                defaultValue={people}
                onChange={(e) => {
                  setPeople(e.target.value);
                }}
              />
            </div>
          </div>
        </section>
        <section className="d-flex  pt-2">
          <div className="w-100 d-flex inform-radio1">
            <div className="w-50 pe-4  ">
              <label className="form-label">有無視訊:</label>
              <div className="d-flex">
                <div className="form-check pe-5 ">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="video"
                    id="videoTrue"
                    onChange={() => {
                      setIsUseVideo(true);
                    }}
                    defaultChecked={isUseVideo}
                  />
                  <label
                    className="form-check-label text-dark"
                    htmlFor="videoTrue"
                  >
                    有
                  </label>
                </div>
                <div className="form-check pe-5 ">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="video"
                    id="videoFalse"
                    onChange={() => {
                      setIsUseVideo(false);
                    }}
                    defaultChecked={!isUseVideo}
                  />
                  <label className="form-check-label" htmlFor="videoFalse">
                    無
                  </label>
                </div>
              </div>
            </div>
            <div className="  pe-4 ">
              <label className="form-label">醫生能不能做主:</label>
              <div className="d-flex">
                <div className="form-check pe-5">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="mainDoctor"
                    id="decideDoctorTrue"
                    onChange={() => {
                      setIsDecided(true);
                    }}
                    defaultChecked={isDecided}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="decideDoctorTrue"
                  >
                    有
                  </label>
                </div>
                <div className="form-check pe-5">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="mainDoctor"
                    id="decideDoctorFalse"
                    onChange={() => {
                      setIsDecided(false);
                    }}
                    defaultChecked={!isDecided}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="decideDoctorFalse"
                  >
                    無
                  </label>
                </div>
              </div>
            </div>
            <div className="w-100 ">
              <label htmlFor="doctorGroup" className="form-label">
                醫療群:
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="doctorGroup"
                placeholder=""
                defaultValue={careGroup}
                onChange={(e) => {
                  setCareGroup(e.target.value);
                }}
              />
            </div>
          </div>
        </section>
        <section className="d-flex  pt-2">
          <div className="w-100 d-flex inform-radio1">
            <div className="w-100 pe-4  ">
              <label className="form-label">
                最新拜訪狀態: <span className="px-3">{clinicStatus}</span>
              </label>
            </div>
          </div>
        </section>
        <section className="pt-2 inform-radio2">
          <div className="w-100 ">
            <label className="form-label">可否預約拜訪醫師時間:</label>
            <div className="d-flex align-items-center flex-wrap overflow-hidden ">
              <div className="form-check py-2 pe-5">
                <input
                  onChange={(e) => {
                    const date = new Date();
                    setVisitDatetime(`${date.getHours()}:${date.getMinutes()}`);
                  }}
                  className="form-check-input"
                  type="radio"
                  name="visitTime"
                  id="visitTimeTrue"
                  defaultChecked={visitDatetime ? true : false}
                />
                <label className="form-check-label" htmlFor="visitTimeTrue">
                  可
                </label>
              </div>
              <div className="form-check py-2 pe-5">
                <input
                  onChange={(e) => {
                    setVisitDatetime("");
                  }}
                  className="form-check-input"
                  type="radio"
                  name="visitTime"
                  id="visitTimeFalse"
                  defaultChecked={!visitDatetime ? true : false}
                />
                <label className="form-check-label" htmlFor="visitTimeFalse">
                  否
                </label>
              </div>
              {visitDatetime && (
                <div className=" input-group-sm ">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="時間"
                    defaultValue={visitDatetime}
                    onChange={(e) => {
                      setVisitDatetime(e.target.value);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="pt-2  inform-care-network">
          <label className="form-label">照護網項目:</label>
          <div className="d-flex align-items-center flex-wrap">
            <div className="form-check py-2  pe-5">
              <Button variant="secondary" onClick={careNetworkCreate}>
                新增
              </Button>
            </div>
            <div className="form-check CareNetwork">
              {careNetwork.map((item) => (
                <InputCheckText
                  key={item.id}
                  text={item.text}
                  onChange={careNetworkHandler}
                  onRemove={careNetwrokRemove}
                />
              ))}
            </div>
          </div>
        </section>
        <Button
          variant="success"
          className="text-white w-25"
          onClick={apiUpdateHandler}
        >
          送出
        </Button>
        <Button variant="secondary" onClick={props.onClose}>
          取消
        </Button>
      </div>
    </Fragment>
  );
};
export default ClinicEditModal;