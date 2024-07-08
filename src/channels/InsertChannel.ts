import * as Tone from 'tone';

interface InsertChannelOptions {
  processor: Tone.ToneAudioNode;
}

class InsertChannel {
  private channel: Tone.Channel;
  private processor: Tone.ToneAudioNode;

  constructor({ processor }: InsertChannelOptions) {
    this.channel = new Tone.Channel().toDestination();
    this.processor = processor;
    this.connectProcessor();
  }

  private connectProcessor(): void {
    this.processor.connect(this.channel);
  }

  public getChannel(): Tone.Channel {
    return this.channel;
  }

  public connect(node: Tone.ToneAudioNode): this {
    this.channel.connect(node);
    return this;
  }

  public disconnect(): this {
    this.channel.disconnect();
    return this;
  }
}

export default InsertChannel;