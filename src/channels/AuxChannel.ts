import * as Tone from 'tone';

interface AuxChannelOptions {
  effects?: Tone.ToneAudioNode[];
}

class AuxChannel {
  private channel: Tone.Channel;
  private effects: Tone.ToneAudioNode[];

  constructor({ effects = [] }: AuxChannelOptions = {}) {
    this.channel = new Tone.Channel().toDestination();
    this.effects = effects;
    this.connectEffects();
  }

  private connectEffects(): void {
    if (this.effects.length > 0) {
      let currentNode: Tone.ToneAudioNode = this.channel;
      this.effects.forEach(effect => {
        currentNode.connect(effect);
        currentNode = effect;
      });
      currentNode.connect(this.channel);
    }
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

  public send(amount: number): Tone.Gain {
    const send = new Tone.Gain(amount);
    this.connect(send);
    return send;
  }

  public addEffect(effect: Tone.ToneAudioNode): this {
    this.effects.push(effect);
    this.connectEffects();
    return this;
  }

  public removeEffect(effect: Tone.ToneAudioNode): this {
    const index = this.effects.indexOf(effect);
    if (index !== -1) {
      this.effects.splice(index, 1);
      this.connectEffects();
    }
    return this;
  }
}

export default AuxChannel;