export default function titleSetter(title: string) {
  return function(route: () => void) {
    // debugger;
    const proto = route.prototype;

    const oldDidTransition = proto.actions.didTransition;
    proto.actions.didTransition = function() {
      proto.eventManager.updateTitle(proto.intl.t(`side_bar.${title}`));
      oldDidTransition();
    };
  };
}
