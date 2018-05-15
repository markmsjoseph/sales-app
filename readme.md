# Sell Your Stuff

## Mark Joseph


TO DO:
      1.Public page for non logged in persons

      2.STYLING:
                  fix overflow of description
                  bootstrap mobile
                  abnormal sized images
                  modal
                  hover effect for each box


IMPROVEMENTS(not implemented because of server requirements):
              Chat: 1.Add Image Uploads to Chats(need server).
                    2.Delete chats- EASY OPTION - each user needs to have 2 separate chat entries in the database so that if 1 usr deletes the chat the other user's chat is left in tact
                                HARDER OPTION -if we remove chat from state array, each time the state array is rendered we will have to remove specific deleted chats for that user, but if user on other end
                                              -sends another message, problems will arise because the chat that was removed is in the deleted chats aarray and the previous messages will be pulled up
              Add Post:(need server to save all post, currently works with url images because they will be accessible to everyone on the web)
                        1.preview post
                        2.add more images when uploading a Post(need server)

              Adds Sections where admins can upload Adds
