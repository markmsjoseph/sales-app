# Sell Your Stuff

## Mark Joseph

To do:

      Chat: Add Image Uploads to Chats
            Delete chats- EASY OPTION - each user needs to have 2 separate chat entries in the database so that if 1 usr deletes the chat the other user's chat is left in tact
                        HARDER OPTION -if we remove chat from state array, each time the state array is rendered we will have to remove specific deleted chats for that user, but if user on other end
                                      -sends another message, problems will arise because the chat that was removed is in the deleted chats aarray and the previous messages will be pulled up

      Add Post:preview post
              :add more images
