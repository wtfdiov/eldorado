package mobile.niobiocash.money;

import android.app.Application;
import android.util.Log;

import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;

import com.oblador.vectoricons.VectorIconsPackage;

import com.reactcommunity.rnlocalize.RNLocalizePackage;

import org.reactnative.camera.RNCameraPackage;

import io.invertase.firebase.RNFirebasePackage;

import com.reactnativecommunity.slider.ReactSliderPackage;

import com.avishayil.rnrestart.ReactNativeRestartPackage;

import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.swmansion.reanimated.ReanimatedPackage;

import com.BV.LinearGradient.LinearGradientPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

  @Override
  protected ReactGateway createReactGateway() {
    ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
      @Override
      protected String getJSMainModuleName() {
        return "index";
      }
    };
    return new ReactGateway(this, isDebug(), host);
  }

  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  protected List<ReactPackage> getPackages() {
    @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
      packages.add(new VectorIconsPackage());
      packages.add(new RNLocalizePackage());
      packages.add(new RNCameraPackage());
      packages.add(new RNFirebasePackage());
      packages.add(new ReactSliderPackage());
      packages.add(new ReactNativeRestartPackage());
      packages.add(new RNGestureHandlerPackage());
      packages.add(new ReanimatedPackage());
      packages.add(new LinearGradientPackage());
      return packages;
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }
}
