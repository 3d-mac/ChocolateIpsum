var Lorem;
(function() {

    //Create a class named Lorem and constructor
    Lorem = function() {
        //Default values.
        this.type = null;
        this.query = null;
        this.data = null;
    };
    //Static variables
    Lorem.TEXT = 1;
    Lorem.TYPE = {
        PARAGRAPH: 1,
        SENTENCE: 2,
        WORD: 3
    };
    //Words to create lorem ipsum text.
    Lorem.WORDS = [ "dark chocolate", "fondant", "dark ghana", "beans", "milk chocolate", "ice cream", "white chocolate", "bittersweet", "semi-sweet", "cacao beans", "roasted", "grown in West Africa", "cocoa butter", "flakes", "cocoa", "cocoa nib", "syrup", "hot", "with", "iced", "grown in West Africa", "chocolate liquor", "buttons", "gianduja", "tempered", "grated", "truffle", "atop", "traditional", "made with love", "fudge", "pudding", ",", "with extra", "cake", "and", "candy coated", "ganache", "chips", "chocolate shell", "brownies", "chocolate fondue", "mousse", "cookies", "lavacake", "chocolate curls", "couverture", "dutch process", "easter eggs", "bitter", "carob", "cinnamon", "chili", "caramel", "hazelnut", "almond", "vanilla", "macadamia", "from Mexico", "sourced from Colombia", "originating in the carribean", "imported from Venezuela", "product of C&ocirc\;te d\'Ivoire", "fair-trade", "organic" ];
    Lorem.ADJECTIVES = [];
    Lorem.SUBJECT = [];
    Lorem.GEO = [];
    Lorem.Conjuntions = [];
    
    //random integer method.
    Lorem.prototype.randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    //text creator method with parameters: how many, what
    Lorem.prototype.createText = function(count, type) {
        switch (type) {
            //paragraphs are loads of sentences.
            case Lorem.TYPE.PARAGRAPH:
                var paragraphs = new Array;
                for (var i = 0; i < count; i++) {
                    var paragraphLength = this.randomInt(3, 7);
                    var paragraph = this.createText(paragraphLength, Lorem.TYPE.SENTENCE);
                    paragraphs.push('<p>'+paragraph+'</p>');
                }
                return paragraphs.join('\n');
                break;
            //sentences are loads of words.
            case Lorem.TYPE.SENTENCE:
                var sentences = new Array;
                for (var i = 0; i < count; i++) {
                    var sentenceLength = this.randomInt(4, 10);
                    var words = this.createText(sentenceLength, Lorem.TYPE.WORD).split(' ');
                    words[0] = words[0].substr(0, 1).toUpperCase() + words[0].substr(1);
                    var sentence = words.join(' ');

                    sentences.push(sentence);
                }
                return (sentences.join('. ') + '.').replace(/(\.\,|\,\.)/g, '.');
                break;
            //words are words
            case Lorem.TYPE.WORD:
                var wordIndex = this.randomInt(0, Lorem.WORDS.length - count - 1);

                return Lorem.WORDS.slice(wordIndex, wordIndex + count).join(' ').replace(/\.|\,/g, '');
                break;
        }
    };
    Lorem.prototype.createLorem = function(element) {

        var lorem = new Array;
        var count;
        
        if (/\d+-\d+[psw]/.test(this.query)){
            var range = this.query.replace(/[a-z]/,'').split("-");
            count = Math.floor(Math.random() * parseInt(range[1])) + parseInt(range[0]);
        } else {
            count = parseInt(this.query); 
        }
        
        if (/\d+p/.test(this.query)) {
            var type = Lorem.TYPE.PARAGRAPH;
        }
        else if (/\d+s/.test(this.query)) {
            var type = Lorem.TYPE.SENTENCE;
        }
        else if (/\d+w/.test(this.query)) {
            var type = Lorem.TYPE.WORD;
        }

        lorem.push(this.createText(count, type));
        lorem = lorem.join(' ');

        if (element) {
            if (this.type == Lorem.TEXT)
                element.innerHTML += lorem;
        }

        if (element == null)
            return lorem;
    };

    //Register as jQuery
    if (typeof jQuery != 'undefined') {
        (function($) {
            $.fn.lorem = function() {
                $(this).each(function() {
                    var lorem = new Lorem;
                    lorem.type = $(this).is('img') ? Lorem.IMAGE : Lorem.TEXT;
                    //data-lorem can be taken with data function (thanks to http://forrst.com/people/webking)
                    lorem.query = $(this).data('lorem');
                    lorem.createLorem(this);
                })
            };

            //If developer run this javascript, then we can run the lorem.js
            $(document).ready(function() {
                $('[data-lorem]').lorem();
            });
        })(jQuery);
    }
})();