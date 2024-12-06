  const profilePic = Base_Url +message.ProfilePics || 
                       (message.userDetails?.profilePic ? 
                        Base_url + message.userDetails?.profilePic : 
                        'https://static.vecteezy.com/system/resources/previews/014/487/014/non_2x/best-female-avatar-icon-flat-vector.jpg'); // Default image if both are undefined
  