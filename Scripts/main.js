
exports.activate = function() {
    // Do work when the extension is activated
}

exports.deactivate = function() {
    // Clean up state before the extension is deactivated
}

class SortAlphanumeric {
    letters = /[^a-zA-Z]/g;
    numbers = /[^0-9]/g;
    
    constructor(string) {
        
        this.compare = this.compare.bind(this)
        
        const lines       = string.split("\n")
        const sortedLines = lines.sort(this.compare)   
        
        // If the string couldn't be sorted, return the original string
        this.sortedValue = Array.isArray(sortedLines) ? sortedLines.join("\n") : string;
    }
    
    get value() {
        return this.sortedValue;
    }

    compare(a, b) {
        const  aLetters = a.replace(this.letters, "");
        const  bLetters = b.replace(this.letters, "");
        
        if (aLetters === bLetters) {
            const aNumbers = parseInt(a.replace(this.numbers, ""), 10);
            const bNumbers = parseInt(b.replace(this.numbers, ""), 10);
            return aNumbers === bNumbers ? 0 : aNumbers > bNumbers ? 1 : -1;
        } 
        else {
            return aLetters > bLetters ? 1 : -1;
        }
    }
}

nova.commands.register("sort-lines-alphabetically.sortLinesAlphanumerically", (editor) => {
    editor.edit(function(e) {
        const sorted = new SortAlphanumeric(editor.selectedText)
        const range  = editor.selectedRange
        e.replace(range, sorted.value);
    });
});
