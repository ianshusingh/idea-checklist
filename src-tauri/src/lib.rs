use tauri::{menu::{MenuBuilder,SubmenuBuilder}, Emitter};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app|{
            let file_menu = SubmenuBuilder::new(app,"File")
                .text("add-idea", "Add an Idea")
                .text("bulk-add-ideas", "Bulk add Ideas")
                .separator()
                .quit()
                .build()?;
            let edit_menu = SubmenuBuilder::new(app,"Edit")
                .undo()
                .redo()
                .separator()
                .cut()
                .copy()
                .paste()
                .select_all()
                .build()?;
            let view_menu = SubmenuBuilder::new(app,"View")
                .text("pending", "Pending Ideas")
                .text("later","Ideas Saved For Later")
                .text("completed","Completed Ideas")
                .build()?;
            let help_menu = SubmenuBuilder::new(app,"Help")
                .text("about","About Idea Checklist")
                .build()?;
            let menu = MenuBuilder::new(app)
                .items(&[&file_menu,&edit_menu,&view_menu,&help_menu])
                .build()?;
            app.set_menu(menu)?;
            app.on_menu_event(move |app_handle, event| {
                match event.id().0.as_str(){
                    "add-idea" => {
                        app_handle.emit("callAction", "add-idea").unwrap();
                    }
                    "bulk-add-ideas" => {
                        app_handle.emit("callAction", "bulk-add").unwrap();
                    }
                    "pending" => {
                        app_handle.emit("changeView", "pending-ideas").unwrap();
                    }
                    "later" => {
                        app_handle.emit("changeView", "saved-for-later").unwrap();
                    }
                    "completed" => {
                        app_handle.emit("changeView", "completed-ideas").unwrap();
                    }
                    "about" => {
                        app_handle.emit("changeView", "about").unwrap();
                    }
                    _ => {
                        println!("Invalid Action");
                    }
                }
            });

            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}