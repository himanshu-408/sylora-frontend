import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import Navbar from '../../components/Navbar'
import axiosInstance from '../../utils/axiosInstance'
import TravelStoryCard from "../../components/TravelStoryCard"
import Modal from "react-modal"
import AddEditTravelStory from './AddEditTravelStory'
import ViewTravelStory from './ViewTravelStory'
import EmptyCard from '../../components/EmptyCard'
// import emptyStory from "../../assets/login-bg-image-webp"


const Home = () => {
  const navigate = useNavigate();
  const [ userInfo, setUserInfo] =  useState(null);
  const [allStories, setAllStories] = useState([]);

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  })

  const [openViewModal, setOpenViewModal] = useState({
    isShown: false,
    data: null,
  })

  const getUserInfo = async() => {
    try{
      const response = await axiosInstance.get("/get-user");
      if(response.data && response.data.user){
        setUserInfo(response.data.user);
      }
    } catch(error) {
      if(error.response.status === 401){
        localStorage.clear();
        navigate("/login");
      }
    }
  }

  const getAllTravelStories = async () => {
    try{
      const response = await axiosInstance.get("/get-all-stories")
      if(response.data && response.data.stories){
        setAllStories(response.data.stories);
      }
    } catch(error) {
      console.log("An error occurred. Please Try again")
    }
  }

  const handleEdit = (data) => {
    setOpenAddEditModal({isShown: true, type: "edit", data: data})
  }

  const handleViewStory = (data) => {
    setOpenViewModal({isShown: true, data})
  }



  const updateIsFavourite = async (storyData) => {
    const storyId = storyData._id;

    try{
        const response = await axiosInstance.put("/update-is-favourite/" + storyId, {isFavourite: !storyData.isFavourite});
        if(response.data && response.data.story){
          getAllTravelStories();
        }
    } catch(error){
      console.log("An error occured");
    }
  }


  const deleteTravelStory = async (data) => {
    const storyId = data._id;

    try{
      const response = await axiosInstance.delete("/delete-story/"+storyId);
      if(response.data && !response.data.error){
        setOpenViewModal((prevState) => ({...prevState, isShown: false}));
        getAllTravelStories();
      }
    } catch(error) {
      console.log("An error occured")
    }
  }



  useEffect(() => {
    getUserInfo();
    getAllTravelStories();
    return () => {};
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo}/>

      <div className="container mx-auto py-10">
        <div className="flex gap-7">
          <div className="flex-1">
              {allStories.length > 0 ? (
                <div className='grid grid-cols-2 gap-4'>
                  {allStories.map((item) => {return <TravelStoryCard 
                      key={item._id} 
                      imgUrl={item.imageUrl} 
                      title={item.title} 
                      story={item.story} 
                      date={item.visitedDate} 
                      visitedLocation={item.visitedLocation} 
                      isFavourite={item.isFavourite} 
                      onEdit={() => handleEdit(item)} 
                      onClick={() => handleViewStory(item)} 
                      onFavouriteClick={() => updateIsFavourite(item)}
                    />}
                )}
                </div>
              ) : <EmptyCard />}
          </div>

          <div className="w-[320px]"></div>
        </div>
      </div>
      
      <Modal
      isOpen={openAddEditModal.isShown}
      onRequestClose={() => {}}
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.2)",
          zIndex: 999,
        },
      }}
      appElement={document.getElementById('root')}
      className='model-box'
      >
        <AddEditTravelStory
        type={openAddEditModal.type}
        storyInfo={openAddEditModal.data}
        onClose={() => {
          setOpenAddEditModal({isShown: false, type: "add", data: null});
        }}
        getAllTravelStories={getAllTravelStories}
        />
      </Modal>


      <Modal
      isOpen={openViewModal.isShown}
      onRequestClose={() => {}}
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.2)",
          zIndex: 999,
        },
      }}
      appElement={document.getElementById('root')}
      className='model-box'
      >
        <ViewTravelStory
          userInfo={userInfo}
          storyInfo={openViewModal.data || null}
          onClose={() => {
            setOpenViewModal((prevState) => ({...prevState, isShown: false}))
          }}
          onEditClick={() =>  {
            setOpenViewModal((prevState) => ({...prevState, isShown: false}))
            handleEdit(openViewModal.data || null)
          }}
          onDeleteClick={() => {
            deleteTravelStory(openViewModal.data || null);
          }}
        />
      </Modal>

      <button className="w-16 h-16 flex items-center justify-center rounded-full bg-cyan-500 hover:bg-cyan-400 fixed right-10 bottom-10" onClick={() => {setOpenAddEditModal({ isShown: true, type: "add", data: null})}}><p className='text-[32px] text-white'>+</p></button>

    </>
  )
}

export default Home