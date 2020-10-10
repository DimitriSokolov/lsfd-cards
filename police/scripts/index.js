const Card = new function() {
    this.size = [ 500, 270 ];

    this.padding = 40;

    this.$canvas = $('<canvas width="' + this.size[0] + '" height="' + this.size[1] + '"></canvas>');

    this.context = this.$canvas[0].getContext("2d");

    this.drawOutline = () => {
        this.context.rect(0, 0, this.size[0], this.size[1]);

        this.context.stroke();
    };

    this.drawEmblem = () => {
        this.context.drawImage(Images.emblem, this.padding - 15, this.padding - 25, 120, 120);
    };

    this.drawAgency = () => {
        this.context.textAlign = "right";

        this.context.font = "italic bold 17px Odense";
        this.context.fillText("City of Los Santos", this.size[0] - this.padding + 10, this.padding - 10);

        this.context.font = "bold 21px Odense";
        this.context.fillText("Los Santos Police Department", this.size[0] - this.padding + 10, this.padding + 14);

        this.context.fillRect(this.padding + 125, this.padding + 22, this.size[0] - ((this.padding * 2) + 115), 2);
        
        this.context.fillStyle = "rgba(0, 0, 0, .9)";

        this.context.font = "bold 14px serif";
        this.context.textAlign = "right";
        this.context.fillText(Web.get("chief"), this.size[0] - this.padding + 10, this.padding + 50);

        this.context.font = "14px CushingStd";
        this.context.textAlign = "left";
        this.context.fillText("To Protect and to", this.padding + 125, this.padding + 42);
        this.context.fillText("Serve since 1869", this.padding + 125, this.padding + 58);
    };

    this.drawCredentials = () => {
        this.context.textAlign = "center";

        this.context.font = "bold 30px serif";
        this.context.fillText(Web.get("name"), this.size[0] - ((this.padding + 105) + this.padding), this.padding + 98);

        this.context.font = "20px Helvetica";
        this.context.fillText(Web.get("position"), this.size[0] - ((this.padding + 105) + this.padding), this.padding + 126);
    };

    this.drawInformation = () => {
        this.context.font = "14px Helvetica";
        
        this.context.fillText(Web.get("bureau"), this.padding - 10, this.padding + 160);
        this.context.fillText(Web.get("street"), this.padding - 10, this.padding + 178);
        this.context.fillText(Web.get("area"), this.padding - 10, this.padding + 196);
        this.context.fillText("www.lspd.online (( lspd.gta.world ))", this.padding - 10, this.padding + 214);
        
        this.context.textAlign = "right";

        this.context.fillText(Web.get("serial") + "@lspd.online", this.size[0] - this.padding + 10, this.padding + 160);
        this.context.fillText("Personal Cell: " + Web.get("number"), this.size[0] - this.padding + 10, this.padding + 178);
        this.context.fillText("Work Cell: " + Web.get("numbercp"), this.size[0] - this.padding + 10, this.padding + 196);
        this.context.fillText("Landline: 91", this.size[0] - this.padding + 10, this.padding + 214);
    };

    this.render = () => {
        this.context.clearRect(0, 0, this.size[0], this.size[1]);

        // TODO: clean this up :c

        this.context.save(); this.drawOutline(); this.context.restore();

        this.context.save(); this.drawEmblem(); this.context.restore();

        this.context.save(); this.drawAgency(); this.context.restore();

        this.context.save(); this.drawCredentials(); this.context.restore();

        this.context.save(); this.drawInformation(); this.context.restore();

        const context = $("#card")[0].getContext("2d");

        context.clearRect(0, 0, 375, 200);

        context.fillStyle = "rgba(252, 252, 252)";

        context.fillRect(0, 0, 375, 200);

        context.drawImage(this.context.canvas, 0, 0, 375, 200);
    };
};

const Images = new function() {
    this.emblem = new Image();

    this.emblem.src = "images/emblem.png";
};

const Web = new function() {
    this.get = (id) => $("#" + id).val();

    $("input").on("keyup", function() {
        Card.render();
    });

    $("#save").click(function() {
        //window.location = Card.context.canvas.toDataURL("png");
    
        alert("i'll get on this later, just right click on the card and save to computer for now :(");
    });

    $("#upload").click(function() {
        try {
            var img = $("#card")[0].toDataURL("image/jpeg", 0.9).split(',')[1];
        }
        catch(e) {
            var img = $("#card")[0].toDataURL().split(',')[1];
        }

        $.ajax({
            url: 'https://api.imgur.com/3/image',
            type: 'post',
            headers: {
                Authorization: 'Client-ID c11d16c7c72ccad'
            },
            data: {
                image: img
            },
            
            dataType: 'json',
            
            success: function(response) {
                if(response.success) {
                    window.location = response.data.link;
                }
                else
                    alert("imgur might be down or something went wrong.");
            }
        });
    });
};
