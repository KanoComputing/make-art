/**
 * App.xaml.cs
 */


using System;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Net.NetworkInformation;
using Windows.ApplicationModel;
using Windows.ApplicationModel.Activation;
using Windows.ApplicationModel.Resources;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Navigation;
using Windows.Foundation.Metadata;


namespace MakeArt
{
    /// <summary>
    /// Provides application-specific behavior to supplement the default Application class.
    /// </summary>
    sealed partial class App : Application
    {
        /// <summary>
        /// Initializes the singleton application object.  This is the first line of authored code
        /// executed, and as such is the logical equivalent of main() or WinMain().
        /// </summary>
        public App()
        {
            this.InitializeComponent();
            this.Suspending += OnSuspending;
            var resources = new ResourceLoader("config");
            var baseUri = resources.GetString("BASE_URL");

            var localSettings = Windows.Storage.ApplicationData.Current.LocalSettings;
            localSettings.Values["BASE_URI"] = baseUri;
        }

        void SetupApp()
        {
            Frame rootFrame = Window.Current.Content as Frame;

            // Do not repeat app initialization when the Window already has content,
            // just ensure that the window is active
            if (rootFrame == null)
            {
                // Create a Frame to act as the navigation context and navigate to the first page
                rootFrame = new Frame();

                rootFrame.NavigationFailed += OnNavigationFailed;

                // Place the frame in the current Window
                Window.Current.Content = rootFrame;
            }
            // Ensure the current window is active
            Window.Current.Activate();
        }

        /// <summary>
        /// Invoked when the application is launched normally by the end user.  Other entry points
        /// will be used such as when the application is launched to open a specific file.
        /// </summary>
        /// <param name="e">Details about the launch request and process.</param>
        protected override void OnLaunched(LaunchActivatedEventArgs e)
        {
            SetupApp();

            bool canEnablePrelaunch = ApiInformation.IsMethodPresent("Windows.ApplicationModel.Core.CoreApplication", "EnablePrelaunch");

            Frame rootFrame = Window.Current.Content as Frame;

            if (e.PreviousExecutionState == ApplicationExecutionState.Terminated) {
                //TODO: Load state from previously suspended application
            }

            if (e.PrelaunchActivated == false)
            {
                // On Windows 10 version 1607 or later, this code signals that this app wants to participate in prelaunch
                if (canEnablePrelaunch) {
                    TryEnablePrelaunch();
                }
                if (rootFrame.Content == null) {
                    // When the navigation stack isn't restored navigate to the first page,
                    // configuring the new page by passing required information as a navigation
                    // parameter
                }
            }
            // If the API is present (doesn't exist on 10240 and 10586)
            if (ApiInformation.IsPropertyPresent(typeof(LaunchActivatedEventArgs).FullName, nameof(LaunchActivatedEventArgs.TileActivatedInfo))) {
                // If clicked on from tile
                if (e.TileActivatedInfo != null) {
                    // If tile notification(s) were present
                    if (e.TileActivatedInfo.RecentlyShownNotifications.Count > 0) {
                        // Get arguments from the notifications that were recently displayed
                        string[] allArgs = e.TileActivatedInfo.RecentlyShownNotifications.Select(i => i.Arguments).ToArray();

                        if (allArgs.Length > 0) {
                            OpenProject(allArgs[0]);
                        }
                    }
                }
            }

            var localSettings = Windows.Storage.ApplicationData.Current.LocalSettings;
            var uri = localSettings.Values["BASE_URI"] as string;
            this.OpenProject(uri);
        }

        private void TryEnablePrelaunch()
        {
            Windows.ApplicationModel.Core.CoreApplication.EnablePrelaunch(true);
        }

        protected override void OnActivated(IActivatedEventArgs e)
        {
            SetupApp();
            if (e is ToastNotificationActivatedEventArgs)
            {
                Frame rootFrame = Window.Current.Content as Frame;
                var toastActivationArgs = e as ToastNotificationActivatedEventArgs;
                OpenProject(toastActivationArgs.Argument);
            }
        }

        void OpenProject(string uri)
        {
            Frame rootFrame = Window.Current.Content as Frame;
            if (rootFrame != null)
            {
                bool isInternetConnected = NetworkInterface.GetIsNetworkAvailable();
                if (!isInternetConnected) {
                    rootFrame.Navigate(typeof(OfflinePage), uri);
                } else {
                    rootFrame.Navigate(typeof(MainPage), uri);
                }
            }
        }

        /// <summary>
        /// Invoked when Navigation to a certain page fails
        /// </summary>
        /// <param name="sender">The Frame which failed navigation</param>
        /// <param name="e">Details about the navigation failure</param>
        void OnNavigationFailed(object sender, NavigationFailedEventArgs e)
        {
            throw new Exception("Failed to load Page " + e.SourcePageType.FullName);
        }

        /// <summary>
        /// Invoked when application execution is being suspended.  Application state is saved
        /// without knowing whether the application will be terminated or resumed with the contents
        /// of memory still intact.
        /// </summary>
        /// <param name="sender">The source of the suspend request.</param>
        /// <param name="e">Details about the suspend request.</param>
        private void OnSuspending(object sender, SuspendingEventArgs e)
        {
            var deferral = e.SuspendingOperation.GetDeferral();
            //TODO: Save application state and stop any background activity
            deferral.Complete();
        }
    }
}
