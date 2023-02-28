HOW TO GET STARTED

1. Requires yarn package manager
2. Server needs to be up and running on backend folder
3. frontend -> yarn dev <- and you good to go

Features implemented

1. Create note on clickoutside from the form
2. Edit Note
3. Pin/Unpi Note
4. Set background-color
5. Drag and drop to re-order your notes
6. Drag and drop the note the the bin to remove it
7. Remove a note and also restore
8. Clicking on the note it brings it up in the middle and expands it.

Features to be added

1. Add label
2. Upload image
3. Add reminder
4. Remove a note after 7 days from the trashbin
5. Make a copy of the note
6. Show checkboxes and progress level
7. Last time it was edited

Improve code

1. Better error handling
2. Better nameCases
3. .gitignore should always refering to both folders if you have backend frontend

Tips

Long names on variables its okay to describe

FrontEnd

1. Better file namings and maybe subfolders -- DONE
2. Make my components smaller for better readability -- DONE
3. Each component should fetch its own state from the backend -- DONE

BackEnd

1. Never get/post requests to Root(/) -- DONE
2. Never have action names in http requests -- DONE
3. Also use more appropiate names like for => /color it could be /update_colors <= -- DONE
4. Use import in back as well to be consistent -- DONE
5. Consistent with backend status code -- DONE

/api/v1/{resource}?{queryParameters}
/resource/subResource/{id}

ON README FILE ADD INSTRUCTIONS ON HOW TO RUN A PROJECT -- DONE

-> Nodemon? for backend
-> Yarn for frontend
