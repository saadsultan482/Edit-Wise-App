let optionButtons = document.querySelectorAll('.option-button');
let advanceOptionButton = document.querySelectorAll('.adv-option-button');
let fontName = document.getElementById('fontName');
let fontSizeRef = document.getElementById('fontSize');
let writingArea = document.getElementById('text-input');
let linkButton = document.getElementById('createLink');
let alignButtons = document.querySelectorAll('.align');
let spacingButtons = document.querySelectorAll('.spacing');
let formatButtons = document.querySelectorAll('.format');
let scriptButtons = document.querySelectorAll('.script');

// List of fontList
let fontList = ['Arial', 'Verdana', 'Times New Roman', 'Garamond', 'Georgia', 'Courier New', 'Cursive'];

// Initial Settings
const initializer = () => {
    highlighter(Array.from(alignButtons), true);
    highlighter(Array.from(spacingButtons), true);
    highlighter(Array.from(formatButtons), false);
    highlighter(Array.from(scriptButtons), true);


    //create options for font names
    fontList.map((value) => {
        let option = document.createElement('option');
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    //fontSize allows only till 7
    for (let i = 1; i <= 7; i++) {
        let option = document.createElement('option');
        option.vcalue = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option)
    }

    //Default Size
    fontSizeRef.value = 1;
};

//main logic
const modifyText = (command, defaultUi, value) => {
    //excecCommand executes command on seleced text
    document.execCommand(command, defaultUi, value);
};


// for basic operations which don't need value parameter
optionButtons.forEach(button => {
    button.addEventListener('click', () => {
        modifyText(button.id, false, null);
    });
});

//options that require value parameter (e.g colors, fonts)

advanceOptionButton.forEach((button) => {
    button.addEventListener('change', () => {
        modifyText(button.id, false, button.value);
    });
});

//link
linkButton.addEventListener('click', () => {
    let userLink = prompt('Enter Url');
    //if link has http than pass directly else add https
    if (/http/i.test(userLink)) {
        modifyText(linkButton.id, false, userLink);
    }
    else {
        userLink = 'http://' + userLink;
        modifyText(linkButton.id, false, userLink);
    }
});

// Highlight clicked Button
const highlighter = (elements, needsRemoval) => {
    elements.forEach((button) => {
        button.addEventListener('click', () => {
            // needsRemoval = true means only one button should be highlighted and others would be normal
            if (needsRemoval) {
                let alreadyActive = false;

                // if currently clicked button is already active
                if (button.classList.contains('active')) {
                    alreadyActive = true;
                }

                // remove Highlight from other buttons
                highlighterRemover(elements);
                if (!alreadyActive) {
                    button.classList.add('active');
                }
            } else {
                // if other buttons can be highlighted
                button.classList.toggle('active');
            }
        });
    });
};

// Remove Highlight from all buttons
const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove('active');
    });
};

window.onload = initializer();
