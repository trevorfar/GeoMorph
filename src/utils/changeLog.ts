function getChangeLog(){
    return `
    Changelog:

    Version 1.0.2: 
    - Added a leaderboard
    - Connected a mongo db 
    - Added usernames (beta)
    - Adjusted various colors 

    Version 1.0.1:
    - Fixed bug where guesses were not being tracked correctly
    - Added a current streak, once you get 5 your score goes up by 2 and you're awarded an additonal hint. At 10, it goes up by 3 and you get 2 more hints.
    - Added new hints feature

    Version 1.0.0:
    - Initial release
    `
}

export const openChangelog = () => {
    const changelogContent = getChangeLog();

    const blob = new Blob([changelogContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.click(); 
    URL.revokeObjectURL(url); 
  };