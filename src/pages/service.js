import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../scss/home.scss";
import "../scss/service/service.scss"
import { Dropdown } from "react-bootstrap";
import SearchFilter from "../component/service/service-filter";
import ServiceListItem from "../component/service/service-list-Item";
import Pagination from "../component/home/Pagination";
import { apiClinicList } from "../api/api-clinic-list";
import { appAction } from "../store/app-slice";
import { filterAction } from "../store/filter-slice";
import { useRef } from "react";
const Home = () => {
  const modalSlice = useSelector((state) => state.modalSlice);
  const [modalIsShow, setModalIsShow] = useState(modalSlice.modalIsShow);
  const appSlice = useSelector((state) => state.appSlice);
  const filterSlice = useSelector((state) => state.filterSlice);
  const dispatch = useDispatch();
  const navigate = useHistory();
  const [clinicList, setClinicList] = useState([]);
  const [filterStatus, setFilterStatus] = useState(filterSlice.clinic_status);
  const [filterCity, setFilterCity] = useState(filterSlice.city);
  const [filterDistrict, setFilterDictrict] = useState(filterSlice.district);
  const [searchText, setSearchText] = useState(filterSlice.searchText);
  const [page, setPage] = useState(filterSlice.page);
  const [totalPage, setTotalPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [permutations, setPermutations] = useState(filterSlice.permutations);
  const [department, setDepartment] = useState(filterSlice.department);
  const [actionStatus, setActionStatus] = useState("");
  const headerRef = useRef(null);
  const divRef = useRef(null);
  useEffect(() => {
    setModalIsShow(modalSlice.modalIsShow);
  }, [modalSlice.modalIsShow]);
  
  useEffect(() => {
    setPage(filterSlice.page);
  }, [filterSlice.page]);
  useEffect(() => {
    setFilterDictrict(filterSlice.district);
  }, [filterSlice.district]);
  useEffect(() => {
    setDepartment(filterSlice.department);
  }, [filterSlice.department]);
  useEffect(() => {
    if ( actionStatus === "page") {
      if (clinicList.length > 2) {
        divRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

      }
      setActionStatus("");
    }else{
      headerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

    }
  }, [clinicList]);

  const statusChangeHandler = (value) => {
    dispatch(filterAction.onClinicStatus(value));
    dispatch(filterAction.onPage(1));
    setFilterStatus(value);
  };

  const cityChangeHangle = (value) => {
    dispatch(filterAction.onCity(value));
    dispatch(filterAction.onDistrict(""));

    setFilterCity(value);
    if (!value) {
      dispatch(filterAction.onCity(""));
      setFilterDictrict("");
    }
    dispatch(filterAction.onPage(1));
  };

  const districtChangeHandler = (value) => {
    dispatch(filterAction.onDistrict(value));
    setFilterDictrict(value);
    dispatch(filterAction.onPage(1));
  };
  const searchTextHandler = (value) => {
    dispatch(filterAction.onsearchText(value));
    setSearchText(value);
    dispatch(filterAction.onPage(1));
  };
  const pageChangeHandler = (value) => {
    setActionStatus("page");
    dispatch(filterAction.onPage(value));
    setPage(value);
  };

  const logoutHandler = () => {
    dispatch(appAction.logout());
  };
  const mutationHandler = (value) => {
    if (!value) {
      value = "Dnew";
    }
    dispatch(filterAction.onPermutations(value));
    setPermutations(value);
    dispatch(filterAction.onPage(1));
  };
  const departmentHandler = (value) => {
    dispatch(filterAction.onDepartment(value));
    dispatch(filterAction.onPage(1));
  };
  const scrollTopHandler = (e) => {
    e.preventDefault();
    headerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  useEffect(() => {
    if (appSlice.isLogin) {
      const token = appSlice.userToken;
      apiClinicList(
        token,
        page,
        filterCity,
        filterDistrict,
        searchText,
        permutations,
        filterStatus,
        department,
        (err, code) => {
          if (code === 601) {
            logoutHandler();
          } else {
            alert(code);
          }
        },
        (list, total, totalPage) => {
          setTotalCount(total);
          setTotalPage(totalPage);
          setClinicList(list);
        }
      );
    } else {
      navigate.push("/login");
    }
  }, [
    appSlice.isLogin,
    page,
    filterCity,
    filterDistrict,
    searchText,
    permutations,
    filterStatus,
    department,
  ]);
  return (
    <Fragment>
      <div className="w-100 mt-3 padding-RWD " ref={headerRef}>
        <SearchFilter
          onStatusChange={statusChangeHandler}
        />
      </div>
      <div className="w-100 padding-RWD mt-3">
        <h4 className="text-center fw-bolder " ref={divRef}>
          客戶服務列表
        </h4>
        <div className="d-flex align-items-end tableSort mb-2">
          <div className="me-3 text-dark fw-bold">
            {`${totalPage === 0 ? 0 : page} / ${totalPage}`} 頁 ，共{totalCount}
            筆
          </div>
          <Dropdown>
            <Dropdown.Toggle
              size="sm"
              variant="secondary"
              className="text-white"
              id="dropdown-basic"
            >
              <FontAwesomeIcon icon="fa-solid fa-arrow-up-short-wide" />
            </Dropdown.Toggle>

            <Dropdown.Menu className="text-center">
              <Dropdown.Item
                as="button"
                className={permutations === "Dnew" ? "active" : ""}
                onClick={() => mutationHandler("Dnew")}
              >
                日期排序
                <FontAwesomeIcon className="ms-1" icon="fas fa-arrow-down" />
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                className={permutations === "Dold" ? "active" : ""}
                onClick={() => mutationHandler("Dold")}
              >
                日期排序
                <FontAwesomeIcon className="ms-1" icon="fas fa-arrow-up" />
              </Dropdown.Item>

              <Dropdown.Item
                as="button"
                className={permutations === "Asmall" ? "active" : ""}
                onClick={() => mutationHandler("Asmall")}
              >
                地名排序
                <FontAwesomeIcon className="ms-1" icon="fas fa-arrow-down" />
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                className={permutations === "Abig" ? "active" : ""}
                onClick={() => mutationHandler("Abig")}
              >
                地名排序
                <FontAwesomeIcon className="ms-1" icon="fas fa-arrow-up" />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <table className="table table-striped table-hover table-bordered   border-dark table-rwd">
          <thead>
            <tr className="bg-secondary text-white tr-only-hide">
              <th scope="col">診所名(機構代碼)</th>
              <th scope="col">標題</th>
              <th scope="col">填表人</th>
              <th scope="col">填表日期</th>
              <th scope="col">處理人</th>
              <th scope="col">處理日期</th>
              <th>處理狀態</th>
              <th style={{ width: "10%" }}></th>
              <th style={{ width: "10%" }}></th>
            </tr>
          </thead>
          <tbody>
            {clinicList.map((item) => (
              <ServiceListItem key={item.id} item={item}></ServiceListItem>
            ))}
          </tbody>
        </table>
      </div>
      {!modalIsShow && (
        <FontAwesomeIcon
          onClick={scrollTopHandler}
          className="text-secondary top-icon"
          icon="fa-solid fa-circle-arrow-up"
        />
      )}
      {totalPage > 0 && (
        <div className="d-flex justify-content-center w-100">
          <Pagination
            page={page}
            totalPage={totalPage}
            onPageChange={pageChangeHandler}
          ></Pagination>
        </div>
      )}
    </Fragment>
  );
};
export default Home;
