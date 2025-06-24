# Idea Checklist

Idea Checklist is a simple and efficient software built with Tauri (Rust as a Backend and React Typescript As a Frontend) For Tech Live Streamers To Manage Viewer-submitted Ideas such as Malware Tests and Windows Test Ideas During the Stream. It helps organize and track ideas by categorizing them into different lists based on their status.

## Features
- Idea Management: Easily track and organize ideas mentioned during the live stream.
- Completed Ideas List: Move ideas to this list when they have been implemented.
- Ideas Saved for Later List: Store ideas here if the viewer who suggested them is absent.
- Bulk Add Ideas: Quickly add multiple ideas from text input.
- Lightweight & Fast: Built with Tauri, ensuring high performance and low resource usage.
- Theme Customization: This App Has a Light Theme, Dark Theme, and a Terminal Theme.
- Auto Save Feature: Every Time You Manage The Idea, It Will Automatically Save To The Local Storage.

## How to use Idea Checklist
### 1. Adding an Idea:
- Click On The Plus Button, Select "Add an Idea" (Or By Going To File -> Add an Idea), Type The Viewer Name and Idea and Click On the "Add an Idea" Button.
- To Add Multiple Ideas At Once, Click On The Plus Button, Select "Bulk add Ideas" (Or By Going To File -> Bulk Add Ideas), Type Some Ideas From a Notepad Like This:
```txt
Name
Idea

Name
Idea (later)
...
```
- Then Click on The "Bulk add Ideas" Button.

### 2. Managing Ideas:
- When an Idea is completed, move it to the Completed Ideas List By Clicking On The Checkbox Icon.
- If The Viewer is absent, move it to "Save For Later" list by Clicking On the Clock icon.
- If The Viewer Wants to Change The Idea, Click On The Edit Button, Change Some Values and Click On "Edit an Idea" To Save The Changes.

### 3. Reviewing And Organizing:
- Review Completed Ideas For Reference.
- Revisit Saved Ideas When The Respective Viewer Is Available and Returned To The Stream.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
